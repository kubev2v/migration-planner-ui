import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { EmptyState } from "./empty-state/EmptyState";
import { RemoveSourceAction } from "./actions/RemoveSourceAction";
import { Columns } from "./Columns";
import { DEFAULT_POLLING_DELAY, VALUE_NOT_AVAILABLE } from "./Constants";
import { SourceStatusView } from "./SourceStatusView";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { Radio, Spinner } from "@patternfly/react-core";
import { Link } from "react-router-dom";
import { Agent } from "@migration-planner-ui/api-client/models";

export const SourcesTable: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const prevAgentsRef = useRef<typeof discoverySourcesContext.agents>([]);
  const memoizedAgents = useMemo(() => {
    const areAgentsEqual = (prevAgents: typeof discoverySourcesContext.agents, newAgents: typeof discoverySourcesContext.agents) => {
      if (!prevAgents || !newAgents || prevAgents.length !== newAgents.length) return false;
      return prevAgents.every((agent, index) => agent.id === newAgents[index].id);
    };

    if (!areAgentsEqual(prevAgentsRef.current, discoverySourcesContext.agents)) {
      prevAgentsRef.current = discoverySourcesContext.agents;
      return discoverySourcesContext.agents ? discoverySourcesContext.agents.sort((a:Agent, b:Agent) => a.id.localeCompare(b.id)):[];
    }
    return prevAgentsRef.current;
  }, [discoverySourcesContext]);
  const hasAgents = memoizedAgents && memoizedAgents.length > 0;
  const [firstAgent, ..._otherAgents] = memoizedAgents ?? [];
  const [isLoading, setIsLoading] = useState(true);
  
  useMount(async () => {
    if (!discoverySourcesContext.isPolling) {
      setIsLoading(true);
      await Promise.all([
        discoverySourcesContext.listSources(),
        discoverySourcesContext.listAgents()
      ]);
      setIsLoading(false);
    }
  });

  useUnmount(() => {
    discoverySourcesContext.stopPolling();
  });

  useEffect(() => {
    if (
      ["error", "up-to-date"].includes(
        discoverySourcesContext.agentSelected?.status
      )
    ) {
      discoverySourcesContext.stopPolling();
      return;
    } else {
      discoverySourcesContext.startPolling(DEFAULT_POLLING_DELAY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoverySourcesContext.agentSelected?.status]);

  useEffect(() => {
    if (hasAgents && !discoverySourcesContext.agentSelected) {
      discoverySourcesContext.selectAgent(firstAgent);
    }
  }, [hasAgents, firstAgent, discoverySourcesContext]);

  if (isLoading) {
    return (
      <Table aria-label="Sources table" variant="compact" borders={false}>
        <Tbody>
          <Tr>
            <Td colSpan={7}>
              <Spinner size="xl" />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    );
  }
  return (
    <Table aria-label="Sources table" variant="compact" borders={false}>
      {hasAgents && (
        <Thead>
          <Tr>
            <Th>{Columns.CredentialsUrl}</Th>
            <Th>{Columns.Status}</Th>
            <Th>{Columns.Hosts}</Th>
            <Th>{Columns.VMs}</Th>
            <Th>{Columns.Networks}</Th>
            <Th>{Columns.Datastores}</Th>
            <Th>{Columns.Actions}</Th>
          </Tr>
        </Thead>
      )}
      <Tbody>
        {hasAgents ? (
          memoizedAgents && memoizedAgents.map((agent) => {
            const source = discoverySourcesContext.sourceSelected;
            return(
           
            <Tr key={agent.id}>
              <Td dataLabel={Columns.CredentialsUrl}>
                {" "}
                <Radio
                  id={agent.id}
                  name="source-selection"
                  label={
                    agent.credentialUrl !== "Example report" ? (
                      <Link to={agent.credentialUrl} target="_blank">
                        {agent.credentialUrl}
                      </Link>
                    ) : (
                      agent.credentialUrl
                    )
                  }
                  isChecked={
                    discoverySourcesContext.agentSelected
                      ? discoverySourcesContext.agentSelected?.id === agent.id
                      : firstAgent.id === agent.id
                  }
                  onChange={() => discoverySourcesContext.selectAgent(agent)}
                />
              </Td>
              <Td dataLabel={Columns.Status}>
                <SourceStatusView
                  status={agent.status}
                  statusInfo={agent.statusInfo}
                />
              </Td>
              <Td dataLabel={Columns.Hosts}>
                {source!==null && source.inventory?.infra.totalHosts || VALUE_NOT_AVAILABLE}
              </Td>
              <Td dataLabel={Columns.VMs}>
                {source!==null && source.inventory?.vms.total || VALUE_NOT_AVAILABLE}
              </Td>
              <Td dataLabel={Columns.Networks}>
                {((source!==null && source.inventory?.infra.networks) ?? []).length ||
                  VALUE_NOT_AVAILABLE}
              </Td>
              <Td dataLabel={Columns.Datastores}>
                {((source!==null && source.inventory?.infra.datastores) ?? []).length ||
                  VALUE_NOT_AVAILABLE}
              </Td>
              <Td dataLabel={Columns.Actions}>
              {agent.credentialUrl !== "Example report" && (<RemoveSourceAction
                  sourceId={agent.id}
                  isDisabled={discoverySourcesContext.isDeletingSource}
                  onConfirm={async (event) => {
                    event.stopPropagation();
                    await discoverySourcesContext.deleteAgent(agent);                   
                    event.dismissConfirmationModal();                   
                    await discoverySourcesContext.listAgents();
                    await discoverySourcesContext.listSources();
                  }}
                />)}
              </Td>
            </Tr>
          )})
        ) : (
          <Tr>
            <Td colSpan={12}>
              <EmptyState />
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

SourcesTable.displayName = "SourcesTable";

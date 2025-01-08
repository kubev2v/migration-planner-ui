import React, { useEffect } from "react";
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

export const SourcesTable: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const hasAgents = discoverySourcesContext.agents && discoverySourcesContext.agents.length > 0;
  const [firstAgent, ..._otherAgents] = discoverySourcesContext.agents ?? [];

  useMount(async () => {
    if (!discoverySourcesContext.isPolling) {
      await Promise.all([
        discoverySourcesContext.listSources(),
        discoverySourcesContext.listAgents()
      ]);
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

  if (
    (discoverySourcesContext.agentSelected === undefined || 
     discoverySourcesContext.sourceSelected === undefined) &&
    !(discoverySourcesContext.agentSelected?.length === 0 || 
      discoverySourcesContext.sourceSelected?.length === 0)
  ) {
    return <Spinner />; // Loading agent and source
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
          discoverySourcesContext.agents && discoverySourcesContext.agents.map((agent) => {
            const source = discoverySourcesContext.sourceSelected;
            return(
           
            <Tr key={agent.id}>
              <Td dataLabel={Columns.CredentialsUrl}>
                {" "}
                <Radio
                  id={agent.id}
                  name="source-selection"
                  label={<Link to={agent.credentialUrl} target="_blank">
                    {agent.credentialUrl}
                  </Link>}
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
                <RemoveSourceAction
                  sourceId={agent.id}
                  isDisabled={discoverySourcesContext.isDeletingSource}
                  onConfirm={async (event) => {
                    event.stopPropagation();
                    await discoverySourcesContext.deleteAgent(agent);                   
                    event.dismissConfirmationModal();                   
                    await discoverySourcesContext.listAgents();
                    await discoverySourcesContext.listSources();
                  }}
                />
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

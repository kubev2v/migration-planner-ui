import React, {  useEffect, useMemo, useRef, useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { EmptyState } from "./empty-state/EmptyState";
import { RemoveSourceAction } from "./actions/RemoveSourceAction";
import { Columns } from "./Columns";
import { DEFAULT_POLLING_DELAY, VALUE_NOT_AVAILABLE } from "./Constants";
import { AgentStatusView } from "./AgentStatusView";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { Radio, Spinner } from "@patternfly/react-core";
import { Link } from "react-router-dom";
import { Agent, Source } from "@migration-planner-ui/api-client/models";

export const SourcesTable: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const prevAgentsRef = useRef<typeof discoverySourcesContext.agents>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedSources, setRelatedSources] = useState<Record<string, Source | null>>({}); // Mapping between agentId -> source
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memorize ordered agents
  const memoizedAgents = useMemo(() => {
    const areAgentsEqual = (prevAgents: typeof discoverySourcesContext.agents, newAgents: typeof discoverySourcesContext.agents): boolean => {
      if (!prevAgents || !newAgents || prevAgents.length !== newAgents.length) return false;
      return prevAgents.every((agent, index) => agent.id === newAgents[index].id);
    };

    if (!areAgentsEqual(prevAgentsRef.current, discoverySourcesContext.agents)) {
      prevAgentsRef.current = discoverySourcesContext.agents;
      return discoverySourcesContext.agents
        ? discoverySourcesContext.agents.sort((a: Agent, b: Agent) => a.id.localeCompare(b.id))
        : [];
    }
    return prevAgentsRef.current;
  }, [discoverySourcesContext]);

  const [firstAgent, ..._otherAgents] = memoizedAgents ?? [];  
  const hasAgents = memoizedAgents && memoizedAgents.length>0;  

  useMount(async () => {
    discoverySourcesContext.startPolling(DEFAULT_POLLING_DELAY); 
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
    // Use timeout to verify memoizedAgents variable
    timeoutRef.current = setTimeout(() => {
      if (memoizedAgents && memoizedAgents.length === 0) {
       setIsLoading(false);
      }
    }, 3000); // Timeout in milisecons (3 seconds here)

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return () => {
      // Clean the timeout in case unmount the component
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [memoizedAgents]);


  // Load the sources related to each agent
  useEffect(() => {
    
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchRelatedSources = async () => {
      if (memoizedAgents && memoizedAgents.length > 0) {
        const sourcesMap: Record<string, Source | null> = {};
        for (const agent of memoizedAgents) {
          if (agent.sourceId) {
            const source = await discoverySourcesContext.getSourceById(agent.sourceId); 
            sourcesMap[agent.id] = source ?? null;
          }
        }
        setRelatedSources(sourcesMap);
      }
    };

   
    if (hasAgents) {    
      fetchRelatedSources().finally(() =>{               
        if (!discoverySourcesContext.agentSelected) {
          discoverySourcesContext.selectAgent(firstAgent);
        }
        setIsLoading(false);
      });      
    }  
    
  }, [memoizedAgents, hasAgents, discoverySourcesContext, firstAgent]);

  // Show spinner until all data is loaded
  if ((isLoading) ) {
    return (
      <Table aria-label="Loading table" variant="compact" borders={false}>
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
  else {
    return (
      <Table aria-label="Sources table" variant="compact" borders={false}>
        {memoizedAgents && memoizedAgents.length>0 && (
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
          {memoizedAgents && memoizedAgents.length>0 ? (
            memoizedAgents.map((agent) => {
              const source = relatedSources[agent.id]; // Get the source related to this agent
              return (
                <Tr key={agent.id}>
                  <Td dataLabel={Columns.CredentialsUrl}>
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
                          ? discoverySourcesContext.agentSelected.id === agent.id
                          : false
                      }
                      onChange={() => discoverySourcesContext.selectAgent(agent)}
                    />
                  </Td>
                  <Td dataLabel={Columns.Status}>
                    <AgentStatusView status={agent.status} statusInfo={agent.statusInfo} credentialUrl={agent.credentialUrl}/>
                  </Td>
                  <Td dataLabel={Columns.Hosts}>
                    {(source?.inventory?.infra.totalHosts ?? VALUE_NOT_AVAILABLE)}
                  </Td>
                  <Td dataLabel={Columns.VMs}>
                    {(source?.inventory?.vms.total ?? VALUE_NOT_AVAILABLE)}
                  </Td>
                  <Td dataLabel={Columns.Networks}>
                    {(source?.inventory?.infra.networks?.length ?? VALUE_NOT_AVAILABLE)}
                  </Td>
                  <Td dataLabel={Columns.Datastores}>
                    {(source?.inventory?.infra.datastores?.length ?? VALUE_NOT_AVAILABLE)}
                  </Td>
                  <Td dataLabel={Columns.Actions}>
                    {agent.credentialUrl !== "Example report" && (
                      <RemoveSourceAction
                        sourceId={agent.id}
                        isDisabled={discoverySourcesContext.isDeletingSource}
                        onConfirm={async (event) => {
                          event.stopPropagation();
                          await discoverySourcesContext.deleteAgent(agent);
                          event.dismissConfirmationModal();
                          await Promise.all([
                            discoverySourcesContext.listAgents(),
                            discoverySourcesContext.listSources(),
                          ]);
                          discoverySourcesContext.selectAgent(firstAgent);
                        }}
                      />
                    )}
                  </Td>
                </Tr>
              );
            })
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
  }
 
};

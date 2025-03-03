import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMount, useUnmount } from "react-use";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { EmptyState } from "./empty-state/EmptyState";
import { RemoveSourceAction } from "./actions/RemoveSourceAction";
import { Columns } from "./Columns";
import { DEFAULT_POLLING_DELAY, VALUE_NOT_AVAILABLE } from "./Constants";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { Radio, Spinner } from "@patternfly/react-core";
import { Link } from "react-router-dom";
import { Source } from "@migration-planner-ui/api-client/models";
import { AgentStatusView } from "./AgentStatusView";
import { UploadInventoryAction } from "./actions/UploadInventoryAction";

export const SourcesTable: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const prevSourcesRef = useRef<typeof discoverySourcesContext.sources>([]);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memorize ordered agents
  const memoizedSources = useMemo(() => {
    const areSourcesEquals = (prevSources: typeof discoverySourcesContext.sources, newSources: typeof discoverySourcesContext.sources): boolean => {
      if (!prevSources || !newSources || prevSources.length !== newSources.length) return false;
      return prevSources.every((agent, index) => agent.id === newSources[index].id);
    };

    if (!areSourcesEquals(prevSourcesRef.current, discoverySourcesContext.sources)) {
      prevSourcesRef.current = discoverySourcesContext.sources;
      return discoverySourcesContext.sources
        ? discoverySourcesContext.sources.sort((a: Source, b: Source) => a.id.localeCompare(b.id))
        : [];
    }
    return prevSourcesRef.current;
  }, [discoverySourcesContext]);

  const [firstSource, ..._otherSources] = memoizedSources ?? [];  
  const hasSources = memoizedSources && memoizedSources.length>0;

  useMount(async () => {
    discoverySourcesContext.startPolling(DEFAULT_POLLING_DELAY); 
    if (!discoverySourcesContext.isPolling) {
        await Promise.all([
          discoverySourcesContext.listSources()
        ]);       
      }
      
  });

  useUnmount(() => {
    discoverySourcesContext.stopPolling();
  });

  useEffect(() => {
    if (!discoverySourcesContext.sourceSelected && firstSource) {
      discoverySourcesContext.selectSource(firstSource);
    }   
  }, [discoverySourcesContext, firstSource, discoverySourcesContext.sourceSelected]);

  useEffect(() => {
    // Use timeout to verify memoizedSources variable
    timeoutRef.current = setTimeout(() => {
      if (memoizedSources && memoizedSources.length === 0) {
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
  }, [memoizedSources]);

  // Show spinner until all data is loaded
  if ((isLoading && !hasSources) ) {
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
      <div style={{ maxHeight: "300px", overflowY: "auto", overflowX: "auto" }}>
      <Table aria-label="Sources table" variant="compact" borders={false}>
        {memoizedSources && memoizedSources.length>0 && (
          <Thead>
            <Tr>
              <Th>{Columns.Name}</Th>
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
          {memoizedSources && memoizedSources.length>0 ? (
            memoizedSources.map((source) => { 
              // Get the agent related to this source
              const agent = source.agent;
              return (
                <Tr key={source.id}>
                   <Td dataLabel={Columns.Name}>
                    <Radio
                      id={source.id}
                      name="source-selection"
                      label={source.name}
                      isChecked={
                        discoverySourcesContext.sourceSelected
                          ? discoverySourcesContext.sourceSelected.id === source.id
                          : false
                      }
                      onChange={() => discoverySourcesContext.selectSource(source)}
                    />
                  </Td>
                  <Td dataLabel={Columns.CredentialsUrl}>
                     {agent!==undefined ? (
                          <Link to={agent.credentialUrl} target="_blank">
                            {agent.credentialUrl}
                          </Link>
                        ) : (
                          '-'
                        )
                      }
                  </Td>
                  <Td dataLabel={Columns.Status}>
                    <AgentStatusView status={agent ? agent.status : 'not-connected'} statusInfo={agent ? agent.statusInfo: 'Not connected'} credentialUrl={agent ? agent.credentialUrl:''}/>
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
                    {source.name !== "Example" && (
                      <RemoveSourceAction
                        sourceId={source.id}
                        sourceName={source.name}
                        isDisabled={discoverySourcesContext.isDeletingSource}
                        onConfirm={async (event) => {
                          event.stopPropagation();
                          await discoverySourcesContext.deleteSource(source.id);
                          event.dismissConfirmationModal();
                          await Promise.all([
                            discoverySourcesContext.listSources(),
                            firstSource && discoverySourcesContext.selectSource(firstSource)
                          ]);
                        }}
                      />
                    )}
                     {!source?.agent && source?.name !== "Example"   && (
                      <UploadInventoryAction
                      sourceId={source.id}
                      discoverySourcesContext={discoverySourcesContext}
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
      </div>
    );
  }
 
};

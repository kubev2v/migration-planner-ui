import React, {
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
import { useAsyncFn, useInterval } from "react-use";
import { type SourceApiInterface, type AgentApiInterface } from "@migration-planner-ui/api-client/apis";
import { useInjection } from "@migration-planner-ui/ioc";
import { Symbols } from "#/main/Symbols";
import { Context } from "./Context";
import { Source } from "@migration-planner-ui/api-client/models";

export const Provider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [sourceSelected, setSourceSelected] = useState<Source | null>(null)

  const sourceApi = useInjection<SourceApiInterface>(Symbols.SourceApi);
  const agentsApi = useInjection<AgentApiInterface>(Symbols.AgentApi);

  const [listAgentsState, listAgents] = useAsyncFn(async () => {
    const agents = await agentsApi.listAgents();
    return agents;
  });

  const [listSourcesState, listSources] = useAsyncFn(async () => {
    const sources = await sourceApi.listSources();
    return sources;
  });

  const [deleteSourceState, deleteSource] = useAsyncFn(async (id: string) => {
    const deletedSource = await sourceApi.deleteSource({ id });
    return deletedSource;
  });


  const [downloadSourceState, downloadSource] = useAsyncFn(
    async (sshKey:string): Promise<void> => {
      const anchor = document.createElement("a");
      const imageUrl = `/planner/api/v1/image${sshKey ? '?sshKey=' + sshKey : ''}`;      

      /*const response = await fetch(imageUrl, { method: 'HEAD' });
      
      if (!response.ok) {
        const error: Error = new Error(`Error downloading source: ${response.status} ${response.statusText}`);
        downloadSourceState.error = error;
        console.error("Error downloading source:", error);
        throw error;
      }
      else {
        downloadSourceState.loading = true;
      }*/
      // TODO(jkilzi): See: ECOPROJECT-2192. 
      // Then don't forget to  remove the '/planner/' prefix in production.
      // const image = await sourceApi.getSourceImage({ id: newSource.id }); // This API is useless in production
      // anchor.href = URL.createObjectURL(image); // Don't do this...
      anchor.href = imageUrl;

      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    }
  );

  const [isPolling, setIsPolling] = useState(false);
  const [pollingDelay, setPollingDelay] = useState<number | null>(null);
  const startPolling = useCallback(
    (delay: number) => {
      if (!isPolling) {
        setPollingDelay(delay);
        setIsPolling(true);
      }
    },
    [isPolling]
  );
  const stopPolling = useCallback(() => {
    if (isPolling) {
      setPollingDelay(null);
      setIsPolling(false);
    }
  }, [isPolling]);
  useInterval(() => {
    listSources();
    //listAgents();
  }, pollingDelay);

  const selectSource = useCallback((source: Source) => {
    setSourceSelected(source);
  }, []);

  const [deleteAgentState, deleteAgent] = useAsyncFn(async (id: string) => {
    const deletedAgent = await agentsApi.deleteAgent({id});   
    return deletedAgent;
  });

  const ctx: DiscoverySources.Context = {
    sources: listSourcesState.value ?? [],
    isLoadingSources: listSourcesState.loading,
    errorLoadingSources: listSourcesState.error,
    isDeletingSource: deleteSourceState.loading,
    errorDeletingSource: deleteSourceState.error,
    isDownloadingSource: downloadSourceState.loading,
    errorDownloadingSource: downloadSourceState.error,    
    isPolling,
    listSources,
    deleteSource,
    downloadSource,
    startPolling,
    stopPolling,
    sourceSelected: sourceSelected,
    selectSource,
    agents: listAgentsState.value,
    isLoadingAgents: listAgentsState.loading,
    errorLoadingAgents: listAgentsState.error,
    listAgents,
    deleteAgent,
    isDeletingAgent: deleteAgentState.loading,
    errorDeletingAgent: deleteAgentState.error
  };

  return <Context.Provider value={ctx}>{children}</Context.Provider>;
};

Provider.displayName = "DiscoverySourcesProvider";

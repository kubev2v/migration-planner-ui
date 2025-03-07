import React, {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
import { useAsyncFn, useInterval } from "react-use";
import {
  type SourceApiInterface,
  type AgentApiInterface,
} from "@migration-planner-ui/api-client/apis";
import { useInjection } from "@migration-planner-ui/ioc";
import { Symbols } from "#/main/Symbols";
import {
  Agent,
  Source,
  SourceUpdateOnPremFromJSON,
} from "@migration-planner-ui/api-client/models";
import { Context } from "./Context";

// 🔹 CONTEXTOS
const ApiAgentContext = createContext<AgentApiInterface | null>(null);
const ApiSourceContext = createContext<SourceApiInterface | null>(null);



// 🔹 PROVIDER PRINCIPAL
export const Provider: React.FC<PropsWithChildren> = ({ children }) => {
  const [sourceSelected, setSourceSelected] = useState<Source | null>(null);
  const [agentSelected, setAgentSelected] = useState<Agent | null>(null);
  const [sourcesLoaded, setSourcesLoaded] = useState(false);

  // 🔹 INYECCIÓN DE DEPENDENCIAS
  const agentsApi = useInjection<AgentApiInterface>(Symbols.AgentApi);
  const sourceApi = useInjection<SourceApiInterface>(Symbols.SourceApi);
  console.log("sourceApi in Provider:", sourceApi);
  // 🔹 FUNCIONES ASÍNCRONAS
  const [listAgentsState, listAgents] = useAsyncFn(async () => {
    if (!sourcesLoaded) return;
    return await agentsApi.listAgents();
  }, [sourcesLoaded]);

  const [listSourcesState, listSources] = useAsyncFn(async () => {
    const sources = await sourceApi.listSources({ includeDefault: true });
    setSourcesLoaded(true);
    return sources;
  });

  const [deleteSourceState, deleteSource] = useAsyncFn(async (id: string) => {
    return await sourceApi.deleteSource({ id });
  });

  const [createSourceState, createSource] = useAsyncFn(async (name: string, sshPublicKey: string) => {
    return await sourceApi.createSource({ sourceCreate: { name, sshPublicKey } });
  });

  const [updateSourceState, updateSource] = useAsyncFn(async (sourceId: string, jsonValue: string) => {
    return await sourceApi.updateSource({
      id: sourceId,
      sourceUpdateOnPrem: SourceUpdateOnPremFromJSON(jsonValue),
    });
  });

  // 🔹 DESCARGAR SOURCE
  const [downloadSourceState, downloadSource] = useAsyncFn(async (sourceName: string, sourceSshKey: string): Promise<void> => {
    const anchor = document.createElement("a");
    anchor.download = `${sourceName}.ova`;

    const newSource = await createSource(sourceName, sourceSshKey);
    const imageUrl = `/planner/api/v1/sources/${newSource.id}/image`;

    const response = await fetch(imageUrl, { method: "HEAD" });

    if (!response.ok) {
      const error = new Error(`Error downloading source: ${response.status} ${response.statusText}`);
      downloadSourceState.error = error;
      console.error("Error downloading source:", error);
      throw error;
    } else {
      downloadSourceState.loading = true;
    }

    anchor.href = imageUrl;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  });

  // 🔹 POLLING
  const [isPolling, setIsPolling] = useState(false);
  const [pollingDelay, setPollingDelay] = useState<number | null>(null);

  const startPolling = useCallback((delay: number) => {
    if (!isPolling) {
      setPollingDelay(delay);
      setIsPolling(true);
    }
  }, [isPolling]);

  const stopPolling = useCallback(() => {
    if (isPolling) {
      setPollingDelay(null);
      setIsPolling(false);
    }
  }, [isPolling]);

  useInterval(() => {
    if (!listSourcesState.loading) {
      listSources();
    }
  }, pollingDelay);

  // 🔹 SELECCIÓN DE SOURCE Y AGENTE
  const selectSource = useCallback((source: Source | null) => {
    setSourceSelected(source);
  }, []);

  const selectSourceById = useCallback(
    (sourceId: string) => {
      if (!listSourcesState.loading) {
        const source = listSourcesState.value?.find((s) => s.id === sourceId);
        setSourceSelected(source || null);
      } else {
        listSources().then((sources) => {
          const source = sources.find((s) => s.id === sourceId);
          setSourceSelected(source || null);
        });
      }
    },
    [listSources, listSourcesState]
  );

  const selectAgent = useCallback(async (agent: Agent) => {
    setAgentSelected(agent);
  }, []);

  const [deleteAgentState, deleteAgent] = useAsyncFn(async (agent: Agent) => {
    return await agentsApi.deleteAgent({ id: agent.id });
  });

  const getSourceById = useCallback((sourceId: string) => {
    return listSourcesState.value?.find((s) => s.id === sourceId);
  }, [listSourcesState.value]);

  // 🔹 CONTEXTO
  const ctx: DiscoverySources.Context = {
    sources: listSourcesState.value ?? [],
    isLoadingSources: listSourcesState.loading,
    errorLoadingSources: listSourcesState.error,
    isDeletingSource: deleteSourceState.loading,
    errorDeletingSource: deleteSourceState.error,
    isCreatingSource: createSourceState.loading,
    errorCreatingSource: createSourceState.error,
    isDownloadingSource: downloadSourceState.loading,
    errorDownloadingSource: downloadSourceState.error,
    isPolling,
    listSources,
    deleteSource,
    downloadSource,
    startPolling,
    stopPolling,
    sourceSelected,
    selectSource,
    agents: listAgentsState.value ?? [],
    isLoadingAgents: listAgentsState.loading,
    errorLoadingAgents: listAgentsState.error,
    listAgents,
    deleteAgent,
    isDeletingAgent: deleteAgentState.loading,
    errorDeletingAgent: deleteAgentState.error,
    selectAgent,
    agentSelected,
    selectSourceById,
    getSourceById,
    updateSource,
    isUpdatingSource: updateSourceState.loading,
    errorUpdatingSource: updateSourceState.error,
  };

  return (
    <Context.Provider value={ctx}>
    <ApiAgentContext.Provider value={agentsApi}>
      <ApiSourceContext.Provider value={sourceApi}>{children}</ApiSourceContext.Provider>
    </ApiAgentContext.Provider>
    </Context.Provider>
  );
};

Provider.displayName = "DiscoverySourcesProvider";

declare namespace DiscoverySources {
  type Context = {
    sources: Source[];
    isLoadingSources: boolean;
    errorLoadingSources?: Error;
    isDeletingSource: boolean;
    errorDeletingSource?: Error;
    isDownloadingSource: boolean;
    errorDownloadingSource?: Error;
    isCreatingSource: boolean;
    errorCreatingSource?: Error;
    isPolling: boolean;
    sourceSelected: Source;
    listSources: () => Promise<Source[]>;
    deleteSource: (id: string) => Promise<Source>;
    downloadSource: (envName: string,sourceSshKey: string) => Promise<void>;
    startPolling: (delay: number) => void;
    stopPolling: () => void;
    selectSource: (source:Source) => void;
    agents: Agent[]|undefined;
    isLoadingAgents: boolean;
    errorLoadingAgents?: Error;
    listAgents: () => Promise<Agent[]|undefined>;
    deleteAgent: (agent: Agent) => Promise<Agent>;
    isDeletingAgent: boolean;
    errorDeletingAgent?: Error;
    selectAgent: (agent:Agent) => void;
    agentSelected: Agent;
    selectSourceById: (sourceId:string)=>void;
    getSourceById: (sourceId: string) => Source;
    updateSource: (sourceId: string, jsonValue: string) => void;
    isUpdatingSource: boolean;
    errorUpdatingSource?: Error;
  };
}

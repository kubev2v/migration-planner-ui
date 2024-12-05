declare namespace DiscoverySources {
  type Context = {
    sources: Source[];
    isLoadingSources: boolean;
    errorLoadingSources?: Error;
    isDeletingSource: boolean;
    errorDeletingSource?: Error;
    isDownloadingSource: boolean;
    errorDownloadingSource?: Error;
    isPolling: boolean;
    sourceSelected: Source;
    listSources: () => Promise<Source[]>;
    deleteSource: (id: string) => Promise<Source>;
    downloadSource: (sourceSshKey: string) => Promise<void>;
    startPolling: (delay: number) => void;
    stopPolling: () => void;
    selectSource: (source:Source) => void;
    agents: Agent[]|undefined;
    isLoadingAgents: boolean;
    errorLoadingAgents?: Error;
    listAgents: () => Promise<Agent[]>;
    deleteAgent: (id: string) => Promise<Agent>;
    isDeletingAgent: boolean;
    errorDeletingAgent?: Error;
  };
}

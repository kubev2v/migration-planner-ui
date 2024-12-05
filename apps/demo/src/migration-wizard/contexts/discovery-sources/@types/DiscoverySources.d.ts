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
    downloadSource: (sourceName: string, sourceSshKey: string) => Promise<void>;
    startPolling: (delay: number) => void;
    stopPolling: () => void;
    selectSource: (source:Source) => void;
  };
}

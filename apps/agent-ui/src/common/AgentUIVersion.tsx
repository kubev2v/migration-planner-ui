import type { AgentUiApiInterface } from "@migration-planner-ui/agent-client/apis";
import type { VersionReply } from "@migration-planner-ui/agent-client/models";
import { useInjection } from "@migration-planner-ui/ioc";
import type React from "react";
import { useEffect, useState } from "react";
import { Symbols } from "../main/Symbols.ts";

export const AgentUIVersion: React.FC = () => {
  const agentApi = useInjection<AgentUiApiInterface>(Symbols.AgentApi);
  const [versionInfo, setVersionInfo] = useState<VersionReply | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVersion = async (): Promise<void> => {
      try {
        const statusReply = await agentApi.getAgentVersion();
        setVersionInfo(statusReply);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error fetching agent version:", err);
        setError(`Failed to fetch version: ${errorMessage}`);
      }
    };

    fetchVersion();
  }, [agentApi]);

  if (error) {
    return (
      <div data-testid="agent-api-lib-version" hidden>
        Error: {error}
      </div>
    );
  }

  if (!versionInfo) {
    return (
      <div data-testid="agent-api-lib-version" hidden>
        Loading...
      </div>
    );
  }

  return (
    <div data-testid="agent-api-lib-version" hidden>
      {versionInfo.version}
    </div>
  );
};

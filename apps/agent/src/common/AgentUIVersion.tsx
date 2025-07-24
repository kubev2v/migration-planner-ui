import React, { useState, useEffect } from "react";
import type { AgentApiInterface } from "@migration-planner-ui/agent-client/apis";
import { useInjection } from "@migration-planner-ui/ioc";
import { Symbols } from "#/main/Symbols";

export const AgentUIVersion: React.FC = () => {
  const agentApi = useInjection<AgentApiInterface>(Symbols.AgentApi);
  const [versionInfo, setVersionInfo] = useState<string | null>(null);
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
      {versionInfo}
    </div>
  );
};

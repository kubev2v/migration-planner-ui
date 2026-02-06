import type { DefaultApiInterface } from "@migration-planner-ui/agent-client/apis";
import type { AgentStatus } from "@migration-planner-ui/agent-client/models";
import { useInjection } from "@migration-planner-ui/ioc";
import type React from "react";
import { useEffect, useState } from "react";
import { Symbols } from "../main/Symbols.ts";

export const AgentUIVersion: React.FC = () => {
  const agentApi = useInjection<DefaultApiInterface>(Symbols.AgentApi);
  const [agentStatus, setAgentStatus] = useState<AgentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async (): Promise<void> => {
      try {
        // Note: The new API doesn't have a version endpoint
        // Using getAgentStatus instead to verify API connectivity
        const status = await agentApi.getAgentStatus();
        setAgentStatus(status);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        console.error("Error fetching agent status:", err);
        setError(`Failed to fetch status: ${errorMessage}`);
      }
    };

    fetchStatus();
  }, [agentApi]);

  if (error) {
    return (
      <div data-testid="agent-api-lib-version" hidden>
        Error: {error}
      </div>
    );
  }

  if (!agentStatus) {
    return (
      <div data-testid="agent-api-lib-version" hidden>
        Loading...
      </div>
    );
  }

  return (
    <div data-testid="agent-api-lib-version" hidden>
      Agent: {agentStatus.mode} - Connection: {agentStatus.consoleConnection}
    </div>
  );
};

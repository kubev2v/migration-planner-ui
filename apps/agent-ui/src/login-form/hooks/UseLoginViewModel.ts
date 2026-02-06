import type { DefaultApiInterface } from "@migration-planner-ui/agent-client/apis";
import type {
  CollectorStartRequest,
  CollectorStatus,
} from "@migration-planner-ui/agent-client/models";
import { useInjection } from "@migration-planner-ui/ioc";
import { useCallback, useEffect, useState } from "react";
import { useTitle } from "react-use";
import { newAbortSignal } from "../../common/AbortSignal";
import type { ApiError } from "../../common/components/index";
import { Symbols } from "../../main/Symbols";
import { REQUEST_TIMEOUT_MS } from "../Constants";
import type { Credentials } from "../LoginFormComponent";

export interface LoginViewModelInterface {
  version: string | undefined;
  isDataShared: boolean;
  isCollecting: boolean;
  status: CollectorStatus["status"] | null;
  error: ApiError | null;
  onCollect: (credentials: Credentials, isDataShared: boolean) => Promise<void>;
  onCancel: () => Promise<void>;
}

export const useLoginViewModel = (): LoginViewModelInterface => {
  useTitle("Login - Migration Discovery VM");
  const agentApi = useInjection<DefaultApiInterface>(Symbols.AgentApi);
  const [version] = useState<string | undefined>("v1.0.0");
  const [isDataShared] = useState<boolean>(false);
  const [isCollecting, setIsCollecting] = useState<boolean>(false);
  const [status, setStatus] = useState<CollectorStatus["status"] | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  // Poll collector status periodically when collecting
  useEffect(() => {
    if (!isCollecting) {
      return;
    }

    const pollStatus = async () => {
      try {
        const collectorStatus = await agentApi.getCollectorStatus();
        setStatus(collectorStatus.status);

        // Check if collection is complete or has error
        if (collectorStatus.status === "collected") {
          setIsCollecting(false);
          setStatus(null);
          // Redirect to report page
          window.location.href = "/report";
        } else if (collectorStatus.status === "error") {
          setIsCollecting(false);
          setError({
            message: collectorStatus.error || "Collection failed",
          });
        }
      } catch (err) {
        console.error("Error polling collector status:", err);
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(pollStatus, 2000);
    pollStatus(); // Initial call

    return () => clearInterval(interval);
  }, [isCollecting, agentApi]);

  const onCollect = useCallback(
    async (credentials: Credentials, dataSharingAllowed: boolean) => {
      setError(null);
      setIsCollecting(true);
      setStatus("connecting");

      try {
        const collectorRequest: CollectorStartRequest = {
          url: credentials.url,
          username: credentials.username,
          password: credentials.password,
        };

        // Note: isDataShared is not supported in the new API
        // If needed, it should be handled separately
        console.log("Data sharing allowed:", dataSharingAllowed);

        const signal = newAbortSignal(
          REQUEST_TIMEOUT_MS,
          "The server didn't respond in a timely fashion.",
        );

        await agentApi.startCollector(
          { collectorStartRequest: collectorRequest },
          { signal },
        );
        // Status will be updated by the polling effect
      } catch (err) {
        setIsCollecting(false);
        setStatus(null);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to start collection";
        setError({ message: errorMessage });
        console.error("Error starting collection:", err);
      }
    },
    [agentApi],
  );

  const onCancel = useCallback(async () => {
    try {
      await agentApi.stopCollector();
      setIsCollecting(false);
      setStatus(null);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to cancel collection";
      setError({ message: errorMessage });
      console.error("Error canceling collection:", err);
    }
  }, [agentApi]);

  return {
    version,
    isDataShared,
    isCollecting,
    status,
    error,
    onCollect,
    onCancel,
  };
};

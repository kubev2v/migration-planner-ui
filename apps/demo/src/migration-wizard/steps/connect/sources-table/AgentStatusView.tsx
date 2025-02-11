import React, { useMemo } from "react";
import type { Agent } from "@migration-planner-ui/api-client/models";
import {
  Button,
  Icon,
  Popover,
  Spinner,
  Split,
  SplitItem,
  TextContent,
  Text,
} from "@patternfly/react-core";
import {
  DisconnectedIcon,
  ExclamationCircleIcon,
  CheckCircleIcon,
  InfoCircleIcon,
} from "@patternfly/react-icons";
import globalDangerColor200 from "@patternfly/react-tokens/dist/esm/global_danger_color_200";
import globalInfoColor100 from "@patternfly/react-tokens/dist/esm/global_info_color_100";
import globalSuccessColor100 from "@patternfly/react-tokens/dist/esm/global_success_color_100";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AgentStatusView {
  export type Props = {
    status: Agent["status"];
    statusInfo?: Agent["statusInfo"];
    credentialUrl?: Agent["credentialUrl"];
  };
}

const StatusInfoWaitingForCredentials: React.FC<{
  credentialUrl?: Agent["credentialUrl"];
}> = ({ credentialUrl }) => {
  return (
    <>
      <TextContent>
        <Text>
          Click the link below to connect the Discovery Source to your VMware
          environment.
        </Text>
      </TextContent>
      {credentialUrl && (
        <Link to={credentialUrl} target="_blank">
          {credentialUrl}
        </Link>
      )}
    </>
  );
};

export const AgentStatusView: React.FC<AgentStatusView.Props> = (props) => {
  const { status, statusInfo, credentialUrl } = props;

  const statusView = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let fake: Agent["status"] | null = null;
    // fake = "not-connected";
    // fake = "waiting-for-credentials";
    // fake = "gathering-initial-inventory";
    // fake = "up-to-date";
    // fake = "error";
    switch (fake ?? status) {
      case "not-connected":
        return {
          icon: (
            <Icon isInline>
              <DisconnectedIcon />
            </Icon>
          ),
          text: "Not connected",
        };
      case "waiting-for-credentials":
        return {
          icon: (
            <Icon size="md" isInline>
              <InfoCircleIcon color={globalInfoColor100.value} />
            </Icon>
          ),
          text: "Waiting for credentials",
        };
      case "gathering-initial-inventory":
        return {
          icon: (
            <Icon size="md" isInline>
              <Spinner />
            </Icon>
          ),
          text: "Gathering inventory",
        };
      case "error":
        return {
          icon: (
            <Icon size="md" isInline>
              <ExclamationCircleIcon color={globalDangerColor200.value} />
            </Icon>
          ),
          text: "Error",
        };
      case "up-to-date":
        return {
          icon: (
            <Icon size="md" isInline>
              <CheckCircleIcon color={globalSuccessColor100.value} />
            </Icon>
          ),
          text: "Ready",
        };
    }
  }, [status]);

  return (
    <Split hasGutter style={{ gap: "0.66rem" }}>
      <SplitItem>{statusView && statusView.icon}</SplitItem>
      <SplitItem>
        {statusInfo || statusView && statusView.text==='Waiting for credentials' ? (
          <Popover
            aria-label={statusView && statusView.text}
            headerContent={statusView && statusView.text}
            headerComponent="h1"
            bodyContent={
              statusView && statusView.text !== "Waiting for credentials" ? (
                <TextContent>
                  <Text>{statusInfo}</Text>
                </TextContent>
              ) : (
                <StatusInfoWaitingForCredentials
                  credentialUrl={credentialUrl}
                />
              )
            }
          >
            <Button variant="link" isInline>
              {statusView && statusView.text}
            </Button>
          </Popover>
        ) : (
          statusView && statusView.text
        )}
      </SplitItem>
    </Split>
  );
};

AgentStatusView.displayName = "AgentStatusView";

import React, { useCallback, useState } from "react";
import {
  Stack,
  StackItem,
  TextContent,
  Text,
  Panel,
  PanelMain,
  PanelHeader,
  List,
  OrderType,
  ListItem,
  Icon,
  Alert,
  Button,
  AlertActionLink,
} from "@patternfly/react-core";
import { chart_color_blue_300 as blueColor } from "@patternfly/react-tokens/dist/esm/chart_color_blue_300";
import { ClusterIcon, PlusCircleIcon } from "@patternfly/react-icons";
import { SourcesTable } from "#/migration-wizard/steps/connect/sources-table/SourcesTable";
import { useDiscoverySources } from "#/migration-wizard/contexts/discovery-sources/Context";
import { DiscoverySourceSetupModal } from "./sources-table/empty-state/DiscoverySourceSetupModal";

export const ConnectStep: React.FC = () => {
  const discoverySourcesContext = useDiscoverySources();
  const [
    shouldShowDiscoverySourceSetupModal,
    setShouldShowDiscoverySetupModal,
  ] = useState(false);

  const toggleDiscoverySourceSetupModal = useCallback((): void => {
    setShouldShowDiscoverySetupModal((lastState) => !lastState);
  }, []);
  const hasAgents = discoverySourcesContext.agents && discoverySourcesContext.agents.length > 0;

  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">Connect your VMware environment</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <TextContent style={{ paddingBlock: "1rem" }}>
          <Text component="h4">
            Follow these steps to connect your environment and start the
            discovery process
          </Text>
          <List
            component="ol"
            type={OrderType.number}
            style={{ marginInlineStart: 0 }}
          >
            <ListItem>
              To add a new source download and import a discovery OVA file to your VMware environment.
            </ListItem>
            <ListItem>
              A link will appear below once the VM is running. Use this link to
              enter credentials and connect your environment.
            </ListItem>
            <ListItem>
              When the connection is established, you will be able to proceed
              and see the discovery report.
            </ListItem>
          </List>
        </TextContent>        
      </StackItem>
      <StackItem>
        <Panel variant="bordered">
          <PanelMain>
            <PanelHeader style={{ paddingBlockEnd: 0 }}>
              <TextContent>
                <Text component="h3">
                  <Icon isInline style={{ marginRight: "1rem" }}>
                    <ClusterIcon />
                  </Icon>
                  Environment
                </Text>
              </TextContent>
            </PanelHeader>
            <SourcesTable />
          </PanelMain>
        </Panel>
      </StackItem>
      <StackItem>
        {hasAgents && (
          <Button
            variant="secondary"
            onClick={toggleDiscoverySourceSetupModal}
            style={{ marginTop: "1rem" }}
            icon={<PlusCircleIcon color={blueColor.value} />}
          >
            Add source
          </Button>
        )}
        {shouldShowDiscoverySourceSetupModal && (
          <DiscoverySourceSetupModal
            isOpen={shouldShowDiscoverySourceSetupModal}
            onClose={toggleDiscoverySourceSetupModal}
            isDisabled={discoverySourcesContext.isDownloadingSource}
            onSubmit={async (event) => {
              const form = event.currentTarget;
              const sshKey = form["discoverySourceSshKey"].value as string;
              await discoverySourcesContext.downloadSource(sshKey);
              toggleDiscoverySourceSetupModal();
              await discoverySourcesContext.listAgents();
            }}
          />
        )}
      </StackItem>
      <StackItem>
        {discoverySourcesContext.isDownloadingSource && (
          <Alert isInline variant="info" title="Download OVA image">
            The OVA image is downloading
            </Alert>
        )}
      </StackItem>
      <StackItem>
        {discoverySourcesContext.errorDownloadingSource && (
          <Alert isInline variant="danger" title="Download Source error">
            {discoverySourcesContext.errorDownloadingSource.message}
            </Alert>
        )}
      </StackItem>
      <StackItem>
      {discoverySourcesContext.agentSelected?.status ===
          "waiting-for-credentials" && (
          <Alert
            isInline
            variant="custom"
            title="Discovery VM"
            actionLinks={
              <AlertActionLink
                component="a"
                href={discoverySourcesContext.agentSelected?.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {discoverySourcesContext.agentSelected?.credentialUrl}
              </AlertActionLink>
            }
          >
            <TextContent>
              <Text>
                Click the link below to connect the Discovery Source to your
                VMware environment.
              </Text>
            </TextContent>
          </Alert>
        )}
      </StackItem>
    </Stack>
  );
};

ConnectStep.displayName = "ConnectStep";

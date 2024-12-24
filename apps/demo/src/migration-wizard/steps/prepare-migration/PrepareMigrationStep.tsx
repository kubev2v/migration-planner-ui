import React from "react";
import {
  Stack,
  StackItem,
  TextContent,
  Text,
  Radio,
} from "@patternfly/react-core";

export const PrepareMigrationStep: React.FC = () => {

  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent>
          <Text component="h2">Prepare for Migration</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <TextContent>
          <Text component="h3">Migration goal</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Radio
          id="lets-try"
          label="Let's try"
          name="lets-try"
          description="Starting with a minimal cluster to try our migration flows and OpenShift Virtualization. (20 VMs or up to cluster capacity limitations)"
          checked
        />
      </StackItem>
      <StackItem>
        <Radio
          id="feel-good"
          label="Feeling good"
          name="feel-good"
          description="Create a cluster that can support a medium migration scale (500 VMs or up to cluster capacity limitations)"
          isDisabled
        />
      </StackItem>
      <StackItem>
        <Radio
          id="got-this"
          label="I got this"
          name="got-this"
          description="Create a cluster that can support a big migration scale (5000 VMs or up to cluster capacity limitations)"
          isDisabled
        />
      </StackItem>
      <StackItem>
        <TextContent style={{ paddingBlock: "1rem" }}>
          <Text component="h3">Target cluster</Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Radio
          id="new-cluster"
          label="New cluster"
          name="new-cluster"
          description="Let's use our OpenShift assisted installer to create a new bare metal cluster"
          checked
        />
      </StackItem>
      <StackItem>
        <Radio
          id="use-existing-cluster"
          label="Use existing cluster"
          name="use-existing-cluster"
          description="Choose one of your OpenShift cluster"
          isDisabled
        />
      </StackItem>
      <StackItem>
        <Radio
          id="use-sandbox"
          label="Use OpenShift developer sandbox (Coming Soon)"
          name="use-sandabox"
          description=""
          isDisabled
        />
      </StackItem>
    </Stack>
  );
};

PrepareMigrationStep.displayName = "PrepareMigrationStep";

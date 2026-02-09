import {
  ActionGroup,
  Button,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";
import type React from "react";
import type { ReactNode } from "react";
import { useState } from "react";

export interface Credentials {
  url: string;
  username: string;
  password: string;
}

interface LoginFormComponentProps {
  collect: (credentials: Credentials) => void;
  cancelCollection?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  dataSharingComponent: ReactNode;
  informationComponent: ReactNode;
  progressComponent?: ReactNode;
}

export const LoginFormComponent: React.FC<LoginFormComponentProps> = ({
  collect,
  cancelCollection,
  isLoading = false,
  isDisabled = false,
  dataSharingComponent,
  informationComponent,
  progressComponent,
}) => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    url.trim() !== "" && username.trim() !== "" && password.trim() !== "";

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isFormValid && !isLoading && !isDisabled) {
      // Normalize URL by removing trailing slash first
      let processedUrl = url.trim().replace(/\/$/, "");
      // Only append /sdk if it doesn't already end with /sdk
      if (!processedUrl.endsWith("/sdk")) {
        processedUrl = `${processedUrl}/sdk`;
      }
      collect({ url: processedUrl, username, password });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup label="vCenter URL" isRequired fieldId="vcenter-url">
        <TextInput
          id="vcenter-url"
          type="url"
          value={url}
          onChange={(_event, value) => setUrl(value)}
          placeholder="https://vcenter_server_ip_address_or_fqdn"
          isRequired
          isDisabled={isDisabled || isLoading}
        />
      </FormGroup>

      <FormGroup label="Username" isRequired fieldId="username">
        <TextInput
          id="username"
          type="text"
          value={username}
          onChange={(_event, value) => setUsername(value)}
          placeholder="su.do@redhat.com"
          isRequired
          isDisabled={isDisabled || isLoading}
        />
      </FormGroup>

      <FormGroup label="Password" isRequired fieldId="password">
        <TextInput
          id="password"
          type="password"
          value={password}
          onChange={(_event, value) => setPassword(value)}
          isRequired
          isDisabled={isDisabled || isLoading}
        />
      </FormGroup>

      <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
        <FlexItem>{dataSharingComponent}</FlexItem>
        <FlexItem>{informationComponent}</FlexItem>
      </Flex>

      <ActionGroup>
        <Flex
          alignItems={{ default: "alignItemsCenter" }}
          gap={{ default: "gapMd" }}
        >
          <FlexItem>
            <Button
              variant="primary"
              type="submit"
              isLoading={isLoading}
              isDisabled={!isFormValid || isDisabled || isLoading}
            >
              Create assessment report
            </Button>
          </FlexItem>
          {isLoading && cancelCollection && (
            <FlexItem>
              <Button variant="link" onClick={cancelCollection}>
                Cancel
              </Button>
            </FlexItem>
          )}
          {isLoading && progressComponent && (
            <FlexItem>{progressComponent}</FlexItem>
          )}
        </Flex>
      </ActionGroup>
    </Form>
  );
};

LoginFormComponent.displayName = "LoginFormComponent";

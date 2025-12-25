import {
  Alert,
  AlertActionLink,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  Icon,
  List,
  ListItem,
  Spinner,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextInput,
} from "@patternfly/react-core";
import { CheckCircleIcon, InfoCircleIcon } from "@patternfly/react-icons";
import { global_success_color_100 } from "@patternfly/react-tokens";
import type React from "react";
import { getConfigurationBasePath } from "../main/Root.tsx";
import { FormStates } from "./FormStates.ts";
import type { LoginFormViewModelInterface } from "./hooks/UseViewModel.ts";

export namespace LoginForm {
  export type Props = {
    vm: LoginFormViewModelInterface;
  };
}

export const LoginForm: React.FC<LoginForm.Props> = (props) => {
  const { vm } = props;
  return (
    <Card
      style={{
        maxWidth: "36rem",
        width: "100%",
        maxHeight: "90vh",
        overflowY: "auto",
      }}
      isFlat
      isRounded
      aria-labelledby="card-header-title"
      aria-describedby="card-body-description"
    >
      <CardHeader id="card-header-title">
        <TextContent>
          <Text component="h2">Migration Discovery VM</Text>
          <Text>
            The migration discovery VM requires access to your VMware environment to execute a
            discovery process that gathers essential data, including network topology, storage
            configuration, and VM inventory. The process leverages this information to provide
            recommendations for a seamless migration to OpenShift Virtualization.
          </Text>
        </TextContent>
      </CardHeader>

      <Divider style={{ backgroundColor: "#f5f5f5", height: "10px", border: "none" }} />

      <CardBody
        id="card-body-note"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #d2d2d2",
          padding: "1rem",
        }}
      >
        <TextContent style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <InfoCircleIcon color="#007bff" />
          <Text component="p" style={{ color: "#002952", fontWeight: "bold" }}>
            Access control
          </Text>
        </TextContent>
        <Text component="p" style={{ marginTop: "0.5rem", marginLeft: "1.5rem" }}>
          A VMware user account with read-only permissions is sufficient for secure access during
          the discovery process.
        </Text>
      </CardBody>

      <Divider style={{ backgroundColor: "#f5f5f5", height: "10px", border: "none" }} />

      <CardBody id="card-body-description">
        <Form ref={vm.formRef} onSubmit={vm.handleSubmit} id="login-form">
          <FormGroup
            label="Environment URL"
            isRequired
            fieldId="url-form-control"
            hidden={
              vm.formState === FormStates.GatheringInventory ||
              vm.formState === FormStates.CredentialsAccepted
            }
          >
            <TextInput
              validated={vm.urlControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="url-form-control"
              type="url"
              name="url"
              value={vm.urlValue}
              onChange={(_event, value) => vm.handleChangeUrl(value)}
              isRequired
              placeholder="https://vcenter_server_ip_address_or_fqdn"
              pattern="https://.*"
              aria-describedby="url-helper-text"
            />
            {vm.urlControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem variant={vm.urlControlStateVariant} id="url-helper-text">
                    {vm.urlControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup
            label="VMware Username"
            isRequired
            fieldId="username-form-control"
            hidden={
              vm.formState === FormStates.GatheringInventory ||
              vm.formState === FormStates.CredentialsAccepted
            }
          >
            <TextInput
              validated={vm.usernameControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="username-form-control"
              type="email"
              name="username"
              value={vm.usernameValue}
              onChange={(_event, value) => vm.handleChangeUsername(value)}
              isRequired
              placeholder="su.do@redhat.com"
              aria-describedby="username-helper-text"
            />
            {vm.usernameControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    variant={vm.usernameControlStateVariant}
                    id="username-helper-text"
                  >
                    {vm.usernameControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup
            label="Password"
            isRequired
            fieldId="password-form-control"
            hidden={
              vm.formState === FormStates.GatheringInventory ||
              vm.formState === FormStates.CredentialsAccepted
            }
          >
            <TextInput
              validated={vm.passwordControlStateVariant}
              isDisabled={vm.shouldDisableFormControl}
              id="password-form-control"
              type="password"
              name="password"
              value={vm.passwordValue}
              onChange={(_event, value) => vm.handleChangePassword(value)}
              isRequired
              aria-describedby="password-helper-text"
            />
            {vm.passwordControlHelperText && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem
                    variant={vm.passwordControlStateVariant}
                    id="password-helper-text"
                  >
                    {vm.passwordControlHelperText}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
          </FormGroup>

          <FormGroup
            fieldId="checkbox-form-control"
            hidden={
              vm.formState === FormStates.GatheringInventory ||
              vm.formState === FormStates.CredentialsAccepted
            }
          >
            <Checkbox
              isDisabled={vm.shouldDisableFormControl}
              id="checkbox-form-control"
              name="isDataSharingAllowed"
              label="I agree to share aggregated data about my environment with Red Hat."
              aria-label="Share aggregated data"
              onChange={(_event, checked) => vm.handleChangeDataSharingAllowed(checked)}
              isChecked={vm.isDataSharingChecked}
            />
          </FormGroup>

          {vm.shouldDisplayAlert && (
            <FormGroup>
              <Alert
                isInline
                variant={vm.alertVariant}
                title={vm.alertTitle}
                actionLinks={
                  <AlertActionLink component="a" href="#">
                    {vm.alertActionLinkText}
                  </AlertActionLink>
                }
              >
                {vm.alertDescriptionList && vm.alertDescriptionList.length > 0 && (
                  <List>
                    {vm.alertDescriptionList.map(({ id, text }) => (
                      <ListItem key={id}>{text}</ListItem>
                    ))}
                  </List>
                )}
              </Alert>
            </FormGroup>
          )}
        </Form>
      </CardBody>

      <CardBody
        id="card-body-discovery-status"
        hidden={
          vm.formState !== FormStates.GatheringInventory &&
          vm.formState !== FormStates.CredentialsAccepted
        }
      >
        {vm.formState === FormStates.GatheringInventory && (
          <Text component="p" style={{ textAlign: "center" }}>
            <Icon size="xl">
              <Spinner />
            </Icon>
            <br />
            Gathering inventory...
          </Text>
        )}
        {vm.formState === FormStates.CredentialsAccepted && (
          <Text component="p" style={{ textAlign: "center" }}>
            <Icon size="xl" isInline>
              <CheckCircleIcon color={global_success_color_100.value} />
            </Icon>
            <br />
            Discovery completed
          </Text>
        )}
      </CardBody>
      <CardFooter>
        <Split style={{ alignItems: "flex-end" }}>
          <SplitItem>
            {vm.formState !== FormStates.CredentialsAccepted &&
              vm.formState !== FormStates.GatheringInventory && (
                <Button
                  type="submit"
                  variant="primary"
                  isDisabled={vm.shouldDisableFormControl || !vm.isDataSharingChecked}
                  form="login-form"
                >
                  Log in
                </Button>
              )}
            {(vm.formState === FormStates.CredentialsAccepted ||
              vm.formState === FormStates.GatheringInventory) && (
              <>
                <Button
                  variant="primary"
                  onClick={() => window.close()}
                  style={{ marginLeft: "16px" }}
                >
                  Go back to assessment wizard
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => window.open(`${getConfigurationBasePath()}/inventory`, "_blank")}
                  style={{ marginLeft: "16px" }}
                >
                  Download Inventory
                </Button>
              </>
            )}
          </SplitItem>
          <SplitItem isFilled />
          <SplitItem style={{ paddingRight: "2rem" }}>
            {vm.formState === FormStates.CheckingStatus && (
              <TextContent>
                <Text component="p">
                  <Spinner isInline /> Checking status...
                </Text>
              </TextContent>
            )}
          </SplitItem>
        </Split>
      </CardFooter>
    </Card>
  );
};

LoginForm.displayName = "LoginForm";

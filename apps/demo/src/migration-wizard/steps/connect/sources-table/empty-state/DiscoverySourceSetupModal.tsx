import React, { useCallback, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  FormHelperText,
  HelperText,
  HelperTextItem,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@patternfly/react-core/next";
import * as Yup from 'yup';

const SSH_PUBLIC_KEY_REGEX =
  /^(ssh-rsa AAAAB3NzaC1yc2|ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNT|ecdsa-sha2-nistp384 AAAAE2VjZHNhLXNoYTItbmlzdHAzODQAAAAIbmlzdHAzOD|ecdsa-sha2-nistp521 AAAAE2VjZHNhLXNoYTItbmlzdHA1MjEAAAAIbmlzdHA1Mj|ssh-ed25519 AAAAC3NzaC1lZDI1NTE5|ssh-dss AAAAB3NzaC1kc3)[0-9A-Za-z+/]+[=]{0,3}( .*)?$/;

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/explicit-function-return-type
export const trimSshPublicKey = (key: string) =>
  key
    .split('\n')
    .map((row) => row.trim())
    .filter(Boolean)
    .join('\n');

// Define your validation schema
// eslint-disable-next-line react-refresh/only-export-components
export const sshPublicKeyValidationSchema = Yup.string().test(
  'ssh-public-key',
  'SSH public key must consist of "[TYPE] key [[EMAIL]]", supported types are: ssh-rsa, ssh-ed25519, ecdsa-[VARIANT]. A single key can be provided only.',
  (value?: string) => {
    if (!value) {
      return true;
    }

    return !!trimSshPublicKey(value).match(SSH_PUBLIC_KEY_REGEX);
  },
);

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DiscoverySourceSetupModal {
  export type Props = {
    isOpen?: boolean;
    isDisabled?: boolean;
    onClose?: ((event: KeyboardEvent | React.MouseEvent) => void) | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  };
}

// Your component
export const DiscoverySourceSetupModal: React.FC<
  DiscoverySourceSetupModal.Props
> = (props) => {
  const { isOpen = false, isDisabled = false, onClose, onSubmit } = props;

  const [sshKey, setSshKey] = useState("");
  const [isSshKeyValid, setIsSshKeyValid] = useState<true | false | undefined>(undefined);
  const [sshKeyErrorMessage, setSshKeyErrorMessage] = useState("");

  // Validate SSH key when it changes
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSshKeyChange = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setSshKey(value);
    const isValid = await sshPublicKeyValidationSchema.isValid(value);
    setIsSshKeyValid(isValid);
    if (!isValid) {
      setSshKeyErrorMessage("SSH key is not valid.");
    } else {
      setSshKeyErrorMessage("");
    }
  };

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit(event);
      }
    },
    [onSubmit]
  );

  return (
    <Modal
      variant="small"
      isOpen={isOpen}
      onClose={onClose}
      ouiaId="DiscoverySourceSetupModal"
      aria-labelledby="discovery-source-setup-modal-title"
      aria-describedby="modal-box-body-discovery-source-setup"
    >
      <ModalHeader
        title="Discovery source setup"
        labelId="discovery-source-setup-modal-title"
      />
      <ModalBody id="modal-box-body-discovery-source-setup">
        <Form
          noValidate={false}
          id="discovery-source-setup-form"
          onSubmit={handleSubmit}
        >
          <FormGroup
            label="Name"
            isRequired
            fieldId="discovery-source-name-form-control"
          >
            <TextInput
              id="discovery-source-name-form-control"
              name="discoverySourceName"
              type="text"
              placeholder="Example: ams-vcenter-prod-1"
              pattern="^[a-zA-Z][a-zA-Z0-9_\-]*$"
              maxLength={50}
              minLength={1}
              isRequired
              aria-describedby="name-helper-text"
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="default" id="name-helper-text">
                  Name the discovery source to help track its deployment
                  environment.
                </HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
          <FormGroup
            label="SSH Key"
            isRequired
            fieldId="discovery-source-sshkey-form-control"
          >
            <TextArea
              id="discovery-source-sshkey-form-control"
              name="discoverySourceSshKey"
              type="text"
              placeholder="Example: ssh-rsa AA...a"
              isRequired
              aria-describedby="sshkey-helper-text"
              value={sshKey}
              onChange={(value) => handleSshKeyChange(value)}
              validated={isSshKeyValid === undefined ? "default" : isSshKeyValid ? "success" : "error"}
            />
            {!isSshKeyValid && (
              <FormHelperText>
                <HelperText>
                  <HelperTextItem variant="error" id="sshkey-helper-text">
                    {sshKeyErrorMessage}
                  </HelperTextItem>
                </HelperText>
              </FormHelperText>
            )}
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant="default" id="sshkey-helper-text">
                  Enter your SSH public key to enable SSH access to the OVA image.
                </HelperTextItem>
              </HelperText>
            </FormHelperText>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          form="discovery-source-setup-form"
          type="submit"
          key="confirm"
          variant="primary"
          isDisabled={isDisabled || !isSshKeyValid}
        >
          Download OVA Image
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DiscoverySourceSetupModal.displayName = "DiscoverySourceSetupModal";

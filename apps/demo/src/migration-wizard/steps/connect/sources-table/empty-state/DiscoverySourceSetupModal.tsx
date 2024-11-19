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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DiscoverySourceSetupModal {
  export type Props = {
    isOpen?: boolean;
    isDisabled?: boolean;
    onClose?: ((event: KeyboardEvent | React.MouseEvent) => void) | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  };
}

export const DiscoverySourceSetupModal: React.FC<
  DiscoverySourceSetupModal.Props
> = (props) => {
  const { isOpen = false, isDisabled = false, onClose, onSubmit } = props;
  const [sshKey, setSshKey] = useState("");
  const [sshKeyError, setSshKeyError] = useState<string | null>(null);

  const validateSshKey = useCallback((key: string): string | null => {
    // SSH key validation regex patterns
    const SSH_KEY_PATTERNS = {
      RSA: /^ssh-rsa\s+[A-Za-z0-9+/]+[=]{0,2}(\s+.*)?$/,
      ED25519: /^ssh-ed25519\s+[A-Za-z0-9+/]+[=]{0,2}(\s+.*)?$/,
      ECDSA: /^ssh-(ecdsa|sk-ecdsa)-sha2-nistp[0-9]+\s+[A-Za-z0-9+/]+[=]{0,2}(\s+.*)?$/,
    };

    // Optional field, so empty is valid
    if (!key) return null;

    // Check if the key matches any of the known SSH key formats
    const isValidKey = Object.values(SSH_KEY_PATTERNS).some(pattern => pattern.test(key.trim()));

    return isValidKey ? null : "Invalid SSH key format. Please provide a valid SSH public key.";
  }, []);

  const handleSshKeyChange = (value: string): void => {
    setSshKey(value);
    setSshKeyError(validateSshKey(value));
  };

  const handleSubmit = useCallback<React.FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();

      // Validate SSH key before submission
      const keyValidationError = validateSshKey(sshKey);
      if (keyValidationError) {
        setSshKeyError(keyValidationError);
        return;
      }

      if (onSubmit) {
        onSubmit(event);
      }
    },
    [onSubmit, sshKey, validateSshKey]
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
            fieldId="discovery-source-sshkey-form-control"
          >
            <TextArea
              id="discovery-source-sshkey-form-control"
              name="discoverySourceSshKey"
              value={sshKey}
              onChange={(_, value) => handleSshKeyChange(value)}
              type="text"
              placeholder="Example: ssh-rsa AAAAB3NzaC1yc2E..."
              aria-describedby="sshkey-helper-text"
              validated={sshKeyError ? 'error' : 'default'}
            />
            <FormHelperText>
              <HelperText>
                <HelperTextItem variant={sshKeyError ? 'error' : 'default'} id="sshkey-helper-text">
                  {sshKeyError || "Enter your SSH public key to enable SSH access to the OVA image."}
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
          isDisabled={isDisabled || !!sshKeyError}
        >
          Download OVA Image
        </Button>
      </ModalFooter>
    </Modal>
  );
};

DiscoverySourceSetupModal.displayName = "DiscoverySourceSetupModal";

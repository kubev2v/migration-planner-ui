import { Button } from "@patternfly/react-core";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@patternfly/react-core/next";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ConfirmationModal {
  export type Props =
    | {
        onClose?: (event: KeyboardEvent | React.MouseEvent) => void;
        onCancel: React.MouseEventHandler<HTMLButtonElement> | undefined;
        onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
        isOpen?: boolean;
        titleIconVariant?: "warning" | "success" | "danger" | "info" | "custom";
        variant?: "default" | "small" | "medium" | "large";
        primaryButtonVariant?:
          | "warning"
          | "danger"
          | "link"
          | "primary"
          | "secondary"
          | "tertiary"
          | "plain"
          | "control";
        title: string;
      }
    | {
        onClose: (event: KeyboardEvent | React.MouseEvent) => void;
        onCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined;
        onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
        isOpen?: boolean;
        titleIconVariant?: "warning" | "success" | "danger" | "info" | "custom";
        variant?: "default" | "small" | "medium" | "large";
        primaryButtonVariant?:
          | "warning"
          | "danger"
          | "link"
          | "primary"
          | "secondary"
          | "tertiary"
          | "plain"
          | "control";
        title: string;
      };
}

export const ConfirmationModal: React.FC<
  React.PropsWithChildren<ConfirmationModal.Props>
> = (props) => {
  const {
    isOpen = false,
    onClose,
    onConfirm,
    onCancel,
    variant = "small",
    titleIconVariant = "info",
    primaryButtonVariant = "primary",
    title,
    children,
  } = props;

  return (
    <Modal
      width="24rem"
      isOpen={isOpen}
      variant={variant}
      aria-describedby="modal-title-icon-description"
      aria-labelledby="title-icon-modal-title"
      onClose={onClose}
    >
      <ModalHeader
        title={title}
        titleIconVariant={titleIconVariant}
        labelId="title-icon-modal-title"
      />
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button
          key="confirm"
          variant={primaryButtonVariant}
          onClick={onConfirm}
        >
          Confirm
        </Button>
        <Button key="cancel" variant="link" onClick={onCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

ConfirmationModal.displayName = "ConfirmationModal";

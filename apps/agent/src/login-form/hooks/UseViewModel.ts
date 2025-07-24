import { useState, useRef, useCallback, useMemo } from "react";
import { useAsync, useTitle } from "react-use";
import { useNavigate } from "react-router-dom";
import { AlertVariant } from "@patternfly/react-core";
import {
  SourceStatus,
  type Credentials,
} from "@migration-planner-ui/agent-client/models";
import type { AgentApiInterface } from "@migration-planner-ui/agent-client/apis";
import { useInjection } from "@migration-planner-ui/ioc";
import { newAbortSignal } from "#/common/AbortSignal";
import {
  DATA_SHARING_ALLOWED_DEFAULT_STATE,
  REQUEST_TIMEOUT_MS,
} from "#/login-form/Constants";
import { FormStates } from "#/login-form/FormStates";
import { FormControlValidatedStateVariant } from "#/login-form/Aliases";
import { Symbols } from "#/main/Symbols";

export interface LoginFormViewModelInterface {
  formState: FormStates;
  formRef: React.MutableRefObject<HTMLFormElement | undefined>;
  urlControlStateVariant: FormControlValidatedStateVariant;
  urlControlHelperText?: string;
  usernameControlStateVariant: FormControlValidatedStateVariant;
  usernameControlHelperText?: string;
  passwordControlStateVariant: FormControlValidatedStateVariant;
  passwordControlHelperText?: string;
  shouldDisableFormControl: boolean;
  alertVariant?: AlertVariant;
  alertTitle?: string;
  alertDescriptionList?: Array<{ id: number; text: string }>;
  alertActionLinkText?: string;
  shouldDisplayAlert: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleReturnToAssistedMigration: () => void;
  handleChangeDataSharingAllowed: (checked: boolean) => void;
  isDataSharingChecked: boolean;
}

const _computeFormControlVariant = (
  formState: FormStates
): FormControlValidatedStateVariant => {
  switch (formState) {
    case FormStates.CredentialsAccepted:
      return "success";
    case FormStates.InvalidCredentials:
    case FormStates.CredentialsRejected:
      return "error";
    default:
      return "default";
  }
};

export const useViewModel = (): LoginFormViewModelInterface => {
  useTitle("Login");
  const navigateTo = useNavigate();
  const [formState, setFormState] = useState<FormStates>(
    FormStates.CheckingStatus
  );
  const formRef = useRef<HTMLFormElement>();
  const agentApi = useInjection<AgentApiInterface>(Symbols.AgentApi);
  const [isDataSharingAllowed, setIsDataSharingAllowed] = useState<boolean>(
    DATA_SHARING_ALLOWED_DEFAULT_STATE
  );

  useAsync(async () => {
    try {
      const res = await agentApi.getStatus();
      switch (res.status) {
        case SourceStatus.SourceStatusWaitingForCredentials:
          setFormState(FormStates.WaitingForCredentials);
          break;
        case SourceStatus.SourceStatusGatheringInitialInventory:
          setFormState(FormStates.GatheringInventory);
          break;
        case SourceStatus.SourceStatusUpToDate:
          setFormState(FormStates.CredentialsAccepted);
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Failed to fetch status:", error);
      setFormState(FormStates.WaitingForCredentials);
    }
  });

  return {
    formState,
    formRef,
    urlControlStateVariant: useMemo<FormControlValidatedStateVariant>(() => {
      switch (formState) {
        case FormStates.CredentialsAccepted:
          return "success";
        case FormStates.InvalidCredentials:
          return "error";
        case FormStates.CredentialsRejected:
          return "error";
        default:
          return "default";
      }
    }, [formState]),
    usernameControlStateVariant: _computeFormControlVariant(formState),
    passwordControlStateVariant: _computeFormControlVariant(formState),
    shouldDisableFormControl: useMemo(
      () =>
        [
          FormStates.CheckingStatus,
          FormStates.Submitting,
          FormStates.CredentialsAccepted,
        ].includes(formState),
      [formState]
    ),
    alertVariant: useMemo(() => {
      switch (formState) {
        case FormStates.CredentialsAccepted:
          return AlertVariant.success;
        case FormStates.InvalidCredentials:
        case FormStates.CredentialsRejected:
          return AlertVariant.danger;
      }
    }, [formState]),
    alertTitle: useMemo(() => {
      switch (formState) {
        case FormStates.CredentialsAccepted:
          return "Connected";
        case FormStates.InvalidCredentials:
          return "Invalid Credentials";
        case FormStates.CredentialsRejected:
          return "Error";
      }
    }, [formState]),
    alertDescriptionList: useMemo(() => {
      switch (formState) {
        case FormStates.CredentialsAccepted:
          return [
            {
              id: 1,
              text: "The migration discovery VM is connected to your VMware environment",
            },
          ];
        case FormStates.InvalidCredentials:
          return [
            { id: 1, text: "Please double-check your entry for any typos." },
            {
              id: 2,
              text: "Verify your account has not been temporarily locked for security reasons.",
            },
          ];
        case FormStates.CredentialsRejected:
          return [
            {
              id: 1,
              text: "Please double-check the URL is correct and reachable from within the VM.",
            },
          ];
      }
    }, [formState]),
    shouldDisplayAlert: useMemo(
      () =>
        ![
          FormStates.CheckingStatus,
          FormStates.WaitingForCredentials,
          FormStates.Submitting,
          FormStates.GatheringInventory,
        ].includes(formState),
      [formState]
    ),
    handleSubmit: useCallback<React.FormEventHandler<HTMLFormElement>>(
      async (event) => {
        event.preventDefault();
        const form = formRef.current;
        if (!form) {
          return;
        }

        const ok = form.reportValidity();
        if (ok) {
          setFormState(FormStates.Submitting);
        } else {
          return;
        }

        const credentials: Credentials = {
          url: form["url"].value,
          username: form["username"].value,
          password: form["password"].value,
          isDataSharingAllowed: form["isDataSharingAllowed"].checked,
        };
        const signal = newAbortSignal(
          REQUEST_TIMEOUT_MS,
          "The server didn't respond in a timely fashion."
        );
        const [statusCodeOK, error] = await agentApi.putCredentials(
          credentials,
          {
            signal,
          }
        );

        const status = statusCodeOK ?? error.code;
        switch (status) {
          case 204:
            setFormState(FormStates.CredentialsAccepted);
            break;
          case 400:
            setFormState(FormStates.CredentialsRejected);
            break;
          case 401:
            setFormState(FormStates.InvalidCredentials);
            break;
          case 422:
            setFormState(FormStates.CredentialsRejected);
            break;
          default:
            navigateTo(`/error/${error?.code || 500}`, {
              state: {
                message: error?.message || "An unexpected error occurred",
              },
            });
            break;
        }
      },
      [agentApi, navigateTo]
    ),
    handleReturnToAssistedMigration: useCallback(async () => {
      const serviceUrl =
        (await agentApi.getServiceUiUrl()) ||
        "http://localhost:3000/migrate/wizard";
      window.open(serviceUrl, "_blank", "noopener,noreferrer");
    }, []),
    handleChangeDataSharingAllowed: useCallback((checked) => {
      setIsDataSharingAllowed(checked);
    }, []),
    isDataSharingChecked: isDataSharingAllowed,
  };
};

import type {
  AgentUiApiInterface,
  SubmitCredentialsRequest,
} from "@migration-planner-ui/agent-client/apis";
// import { SourceStatus,  } from "@migration-planner-ui/agent-client/models";
import { useInjection } from "@migration-planner-ui/ioc";
import { AlertVariant } from "@patternfly/react-core";
import { useCallback, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAsync } from "react-use";
import { useTitle } from "react-use";
import { newAbortSignal } from "../../common/AbortSignal.ts";
import type { FormControlValidatedStateVariant } from "../../login-form/Aliases.ts";
import {
  DATA_SHARING_ALLOWED_DEFAULT_STATE,
  REQUEST_TIMEOUT_MS,
} from "../../login-form/Constants.ts";
import { FormStates } from "../../login-form/FormStates.ts";
import { Symbols } from "../../main/Symbols.ts";

export interface LoginFormViewModelInterface {
  formState: FormStates;
  formRef: React.MutableRefObject<HTMLFormElement | undefined>;
  urlControlStateVariant: FormControlValidatedStateVariant;
  urlControlHelperText?: string;
  urlValue: string;
  handleChangeUrl: (value: string) => void;
  usernameControlStateVariant: FormControlValidatedStateVariant;
  usernameControlHelperText?: string;
  usernameValue: string;
  handleChangeUsername: (value: string) => void;
  passwordControlStateVariant: FormControlValidatedStateVariant;
  passwordControlHelperText?: string;
  passwordValue: string;
  handleChangePassword: (value: string) => void;
  shouldDisableFormControl: boolean;
  alertVariant?: AlertVariant;
  alertTitle?: string;
  alertDescriptionList?: Array<{ id: number; text: string }>;
  alertActionLinkText?: string;
  shouldDisplayAlert: boolean;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChangeDataSharingAllowed: (checked: boolean) => void;
  isDataSharingChecked: boolean;
}

const _computeFormControlVariant = (
  formState: FormStates,
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
  // const navigateTo = useNavigate();
  const [formState, setFormState] = useState<FormStates>(
    FormStates.CheckingStatus,
  );
  const formRef = useRef<HTMLFormElement>();
  const agentApi = useInjection<AgentUiApiInterface>(Symbols.AgentApi);
  const [isDataSharingAllowed, setIsDataSharingAllowed] = useState<boolean>(
    DATA_SHARING_ALLOWED_DEFAULT_STATE,
  );
  const [urlValue, setUrlValue] = useState<string>("");
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  // useAsync(async () => {
  // 	try {
  // 		const res = await agentApi.getAgentStatus();
  // 		switch (res.status) {
  // 			case SourceStatus.SourceStatusWaitingForCredentials:
  // 				setFormState(FormStates.WaitingForCredentials);
  // 				break;
  // 			case SourceStatus.SourceStatusGatheringInitialInventory:
  // 				setFormState(FormStates.GatheringInventory);
  // 				break;
  // 			case SourceStatus.SourceStatusUpToDate:
  // 				setFormState(FormStates.CredentialsAccepted);
  // 				break;

  // 			default:
  // 				break;
  // 		}
  // 	} catch (error) {
  // 		console.error("Failed to fetch status:", error);
  // 		setFormState(FormStates.WaitingForCredentials);
  // 	}
  // });

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
    urlValue,
    handleChangeUrl: useCallback((value: string) => {
      setUrlValue(value);
    }, []),
    usernameControlStateVariant: _computeFormControlVariant(formState),
    usernameValue,
    handleChangeUsername: useCallback((value: string) => {
      setUsernameValue(value);
    }, []),
    passwordControlStateVariant: _computeFormControlVariant(formState),
    passwordValue,
    handleChangePassword: useCallback((value: string) => {
      setPasswordValue(value);
    }, []),
    shouldDisableFormControl: useMemo(
      () =>
        [
          FormStates.CheckingStatus,
          FormStates.Submitting,
          FormStates.CredentialsAccepted,
        ].includes(formState),
      [formState],
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
      [formState],
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

        const credentials: SubmitCredentialsRequest = {
          credentials: {
            url: urlValue,
            username: usernameValue,
            password: passwordValue,
            isDataSharingAllowed: isDataSharingAllowed,
          },
        };
        const signal = newAbortSignal(
          REQUEST_TIMEOUT_MS,
          "The server didn't respond in a timely fashion.",
        );
        await agentApi.submitCredentials(credentials, {
          signal,
        });
      },
      [agentApi, urlValue, usernameValue, passwordValue, isDataSharingAllowed],
    ),
    handleChangeDataSharingAllowed: useCallback((checked) => {
      setIsDataSharingAllowed(checked);
    }, []),
    isDataSharingChecked: isDataSharingAllowed,
  };
};

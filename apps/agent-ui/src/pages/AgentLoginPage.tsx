import { Backdrop, Bullseye } from "@patternfly/react-core";
import type React from "react";
import { useViewModel } from "../login-form/hooks/UseViewModel.ts";
import { LoginForm } from "../login-form/LoginForm.tsx";

const AgentLoginPage: React.FC = () => {
  const vm = useViewModel();

  return (
    <>
      <Backdrop style={{ zIndex: 0 }} />
      <Bullseye>
        <LoginForm vm={vm} />
      </Bullseye>
    </>
  );
};

AgentLoginPage.displayName = "AgentLoginPage";

export default AgentLoginPage;

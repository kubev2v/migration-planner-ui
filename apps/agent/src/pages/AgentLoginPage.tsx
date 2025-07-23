import React from "react";
import { Bullseye, Backdrop } from "@patternfly/react-core";
import { LoginForm } from "#/login-form/LoginForm";
import { useViewModel } from "#/login-form/hooks/UseViewModel";

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

import { Bullseye } from "@patternfly/react-core";
import type React from "react";
import { useLoginViewModel } from "../login-form/hooks/UseLoginViewModel";
import { LoginCard } from "../login-form/LoginCard";

const AgentLoginPage: React.FC = () => {
  const vm = useLoginViewModel();

  return (
    <Bullseye
      style={{ minHeight: "100vh", height: "100vh", overflow: "hidden" }}
    >
      <LoginCard
        version={vm.version}
        isDataShared={vm.isDataShared}
        isCollecting={vm.isCollecting}
        status={vm.status}
        error={vm.error}
        onCollect={vm.onCollect}
        onCancel={vm.onCancel}
      />
    </Bullseye>
  );
};

AgentLoginPage.displayName = "AgentLoginPage";

export default AgentLoginPage;

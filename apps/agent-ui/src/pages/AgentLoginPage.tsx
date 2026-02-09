import type React from "react";
import { useLoginViewModel } from "../login-form/hooks/UseLoginViewModel";
import { LoginCard } from "../login-form/LoginCard";

const AgentLoginPage: React.FC = () => {
  const vm = useLoginViewModel();

  return (
    <LoginCard
      version={vm.version}
      isDataShared={vm.isDataShared}
      isCollecting={vm.isCollecting}
      status={vm.status}
      error={vm.error}
      onCollect={vm.onCollect}
      onCancel={vm.onCancel}
    />
  );
};

AgentLoginPage.displayName = "AgentLoginPage";

export default AgentLoginPage;

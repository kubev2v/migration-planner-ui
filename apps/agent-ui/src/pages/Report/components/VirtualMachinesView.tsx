import type { VM } from "@migration-planner-ui/agent-client/models";
import type React from "react";
import { VMTable } from "./VMTable";

interface VirtualMachinesViewProps {
  vms: VM[];
  loading?: boolean;
}

export const VirtualMachinesView: React.FC<VirtualMachinesViewProps> = ({
  vms,
  loading = false,
}) => {
  return <VMTable vms={vms} loading={loading} />;
};

VirtualMachinesView.displayName = "VirtualMachinesView";

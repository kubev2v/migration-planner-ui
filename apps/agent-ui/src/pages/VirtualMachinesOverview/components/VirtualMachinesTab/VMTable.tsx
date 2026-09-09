import { css } from "@emotion/css";
import type React from "react";
import { useVMTableLogic } from "./useVMTableLogic";
import { VMTableGrid } from "./VMTableGrid";
import { VMTableModals } from "./VMTableModals";
import { VMTableToolbar } from "./VMTableToolbar";
import { resolveVariantUI } from "./vmTableShared";
import type { VMTableProps } from "./vmTableTypes";

export type { VMTableProps } from "./vmTableTypes";

const vmTableContainerStyle = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const gridScrollContainerStyle = css`
  flex-grow: 1;
  overflow: auto;
  min-height: 0;
  flex-basis: 0;
`;

export const VMTable: React.FC<VMTableProps> = ({
  vms,
  loading,
  initialFilters,
  onVMClick,
  onVMApplicationsClick,
  onVMIssuesClick,
  totalVMs,
  currentPage = 1,
  pageSize = 20,
  onFiltersChange,
  onPageChange,
  onSortChange,
  availableFilterOptions,
  selectedVMs = new Set<string>(),
  onSelectionChange,
  onFetchAllVmIds,
  onRunDeepInspection,
  onExcludeFromReports,
  onIncludeInReports,
  onAddLabels,
  onEditLabels,
  onManageLabels,
  onCreateGroup,
  onAddToGroup,
  onRemoveFromGroup,
  inspectionActive = false,
  inspectionContextVms,
  selectionContextLoadFailed,
  cancelingInspectionVmIds,
  onCancelInspection,
  onResetInspection,
  variant = "overview",
}) => {
  const variantUI = resolveVariantUI({ variant, totalVMs });
  const isGroupRowActions = variant === "groups";

  const logic = useVMTableLogic({
    vms,
    initialFilters,
    totalVMs,
    currentPage,
    pageSize,
    onFiltersChange,
    onPageChange,
    onSortChange,
    availableFilterOptions,
    selectedVMs,
    onSelectionChange,
    onFetchAllVmIds,
    variant,
  });

  return (
    <div className={vmTableContainerStyle}>
      <VMTableToolbar
        logic={logic}
        variantUI={variantUI}
        loading={loading}
        vms={vms}
        totalVMs={totalVMs}
        selectedVMs={selectedVMs}
        onSelectionChange={onSelectionChange}
        onFetchAllVmIds={onFetchAllVmIds}
        onPageChange={onPageChange}
        inspectionActive={inspectionActive}
        isGroupRowActions={isGroupRowActions}
        onExcludeFromReports={onExcludeFromReports}
        onIncludeInReports={onIncludeInReports}
        onAddLabels={onAddLabels}
        onManageLabels={onManageLabels}
        onCreateGroup={onCreateGroup}
        onAddToGroup={onAddToGroup}
        onRemoveFromGroup={onRemoveFromGroup}
        onRunDeepInspection={onRunDeepInspection}
        onResetInspection={onResetInspection}
        inspectionContextVms={inspectionContextVms}
        selectionContextLoadFailed={selectionContextLoadFailed}
      />
      <div className={gridScrollContainerStyle}>
        <VMTableGrid
          logic={logic}
          variantUI={variantUI}
          loading={loading}
          vms={vms}
          selectedVMs={selectedVMs}
          isGroupRowActions={isGroupRowActions}
          onVMClick={onVMClick}
          onVMApplicationsClick={onVMApplicationsClick}
          onVMIssuesClick={onVMIssuesClick}
          onRunDeepInspection={onRunDeepInspection}
          onExcludeFromReports={onExcludeFromReports}
          onIncludeInReports={onIncludeInReports}
          onEditLabels={onEditLabels}
          onAddToGroup={onAddToGroup}
          onRemoveFromGroup={onRemoveFromGroup}
          openCancelInspectionConfirm={logic.openCancelInspectionConfirm}
          cancelingInspectionVmIds={cancelingInspectionVmIds}
          inspectionContextVms={inspectionContextVms}
          selectionContextLoadFailed={selectionContextLoadFailed}
        />
      </div>
      <VMTableModals
        logic={logic}
        cancelingInspectionVmIds={cancelingInspectionVmIds}
        onCancelInspection={onCancelInspection}
        onExcludeFromReports={onExcludeFromReports}
        onIncludeInReports={onIncludeInReports}
        onSelectionChange={onSelectionChange}
      />
    </div>
  );
};

VMTable.displayName = "VMTable";

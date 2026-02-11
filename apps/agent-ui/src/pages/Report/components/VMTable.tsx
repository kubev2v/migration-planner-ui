import type { VM } from "@migration-planner-ui/agent-client/models";
import {
  Button,
  // Checkbox,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownList,
  Label,
  LabelGroup,
  MenuToggle,
  type MenuToggleElement,
  Pagination,
  SearchInput,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import {
  CheckCircleIcon,
  EllipsisVIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FilterIcon,
} from "@patternfly/react-icons";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  type ThProps,
  Tr,
} from "@patternfly/react-table";
import type React from "react";
import { useMemo, useState } from "react";

interface VMTableProps {
  vms: VM[];
  loading: boolean;
  onVMClick?: (vmId: string) => void;
}

type SortableColumn =
  | "name"
  | "vCenterState"
  | "diskSize"
  | "memory"
  | "issues";

const statusLabels: Record<string, string> = {
  poweredOn: "Powered on",
  poweredOff: "Powered off",
  suspended: "Suspended",
};

// Disk size ranges in MB (displayed as TB)
const diskSizeRanges = [
  { label: "0-10 TB", min: 0, max: 10 * 1024 * 1024 },
  { label: "11-20 TB", min: 10 * 1024 * 1024 + 1, max: 20 * 1024 * 1024 },
  { label: "21-50 TB", min: 20 * 1024 * 1024 + 1, max: 50 * 1024 * 1024 },
  { label: "50+ TB", min: 50 * 1024 * 1024 + 1, max: undefined },
];

// Memory size ranges in MB (displayed as GB)
const memorySizeRanges = [
  { label: "0-4 GB", min: 0, max: 4 * 1024 },
  { label: "5-16 GB", min: 4 * 1024 + 1, max: 16 * 1024 },
  { label: "17-32 GB", min: 16 * 1024 + 1, max: 32 * 1024 },
  { label: "33-64 GB", min: 32 * 1024 + 1, max: 64 * 1024 },
  { label: "65-128 GB", min: 64 * 1024 + 1, max: 128 * 1024 },
  { label: "129-256 GB", min: 128 * 1024 + 1, max: 256 * 1024 },
  { label: "256+ GB", min: 256 * 1024 + 1, max: undefined },
];

const MB_IN_GB = 1024;
const MB_IN_TB = 1024 * 1024;

const formatDiskSize = (sizeInMB: number): string => {
  if (sizeInMB >= MB_IN_TB) {
    const sizeInTB = sizeInMB / MB_IN_TB;
    return `${sizeInTB.toFixed(sizeInTB % 1 === 0 ? 0 : 2)} TB`;
  }
  const sizeInGB = sizeInMB / MB_IN_GB;
  return `${sizeInGB.toFixed(sizeInGB % 1 === 0 ? 0 : 2)} GB`;
};

const formatMemorySize = (sizeInMB: number): string => {
  const sizeInGB = sizeInMB / MB_IN_GB;
  return `${sizeInGB.toFixed(sizeInGB % 1 === 0 ? 0 : 2)} GB`;
};

interface AppliedFilter {
  category: string;
  label: string;
  key: string;
}

export const VMTable: React.FC<VMTableProps> = ({
  vms,
  loading,
  onVMClick,
}) => {
  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // Search state (client-side only)
  const [searchValue, setSearchValue] = useState("");

  // Filter dropdown state
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Local filter state
  const [selectedDiskRange, setSelectedDiskRange] = useState<number | null>(
    null,
  );
  const [selectedMemoryRange, setSelectedMemoryRange] = useState<number | null>(
    null,
  );
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [hasIssuesFilter, setHasIssuesFilter] = useState(false);

  // Selection state
  // const [selectedVMs, setSelectedVMs] = useState<Set<string>>(new Set());

  // Row actions dropdown state
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Sort state
  const [activeSortIndex, setActiveSortIndex] = useState<number | null>(null);
  const [activeSortDirection, setActiveSortDirection] = useState<
    "asc" | "desc"
  >("asc");

  // Column definitions
  const columns: { key: SortableColumn; label: string; sortable: boolean }[] = [
    { key: "name", label: "Name", sortable: true },
    { key: "vCenterState", label: "Status", sortable: true },
    { key: "diskSize", label: "Disk size", sortable: true },
    { key: "memory", label: "Memory size", sortable: true },
    { key: "issues", label: "Issues", sortable: true },
  ];

  // Build list of applied filters for chip display
  const appliedFilters = useMemo(() => {
    const filters: AppliedFilter[] = [];

    if (selectedDiskRange !== null) {
      filters.push({
        category: "Disk size",
        label: diskSizeRanges[selectedDiskRange].label,
        key: "diskSize",
      });
    }

    if (selectedMemoryRange !== null) {
      filters.push({
        category: "Memory",
        label: memorySizeRanges[selectedMemoryRange].label,
        key: "memorySize",
      });
    }

    selectedStatuses.forEach((status) => {
      filters.push({
        category: "Status",
        label: statusLabels[status] || status,
        key: `status-${status}`,
      });
    });

    if (hasIssuesFilter) {
      filters.push({
        category: "Issues",
        label: "Has issues",
        key: "hasIssues",
      });
    }

    return filters;
  }, [
    selectedDiskRange,
    selectedMemoryRange,
    selectedStatuses,
    hasIssuesFilter,
  ]);

  // Client-side filtering
  const filteredVMs = useMemo(() => {
    return vms.filter((vm) => {
      // Search filter
      if (
        searchValue &&
        !vm.name.toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return false;
      }

      // Disk size filter
      if (selectedDiskRange !== null) {
        const range = diskSizeRanges[selectedDiskRange];
        const diskSizeMB = vm.diskSize || 0;
        if (
          range.max !== undefined &&
          (diskSizeMB < range.min || diskSizeMB > range.max)
        ) {
          return false;
        }
        if (range.max === undefined && diskSizeMB < range.min) {
          return false;
        }
      }

      // Memory filter
      if (selectedMemoryRange !== null) {
        const range = memorySizeRanges[selectedMemoryRange];
        const memoryMB = vm.memory || 0;
        if (
          range.max !== undefined &&
          (memoryMB < range.min || memoryMB > range.max)
        ) {
          return false;
        }
        if (range.max === undefined && memoryMB < range.min) {
          return false;
        }
      }

      // Status filter
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(vm.vCenterState || "")
      ) {
        return false;
      }

      // Issues filter
      if (hasIssuesFilter && (vm.issueCount || 0) === 0) {
        return false;
      }

      return true;
    });
  }, [
    vms,
    searchValue,
    selectedDiskRange,
    selectedMemoryRange,
    selectedStatuses,
    hasIssuesFilter,
  ]);

  // Client-side sorting
  const sortedVMs = useMemo(() => {
    if (activeSortIndex === null) return filteredVMs;

    const columnKey = columns[activeSortIndex].key;
    const sorted = [...filteredVMs].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (columnKey) {
        case "name":
          aValue = a.name || "";
          bValue = b.name || "";
          break;
        case "vCenterState":
          aValue = a.vCenterState || "";
          bValue = b.vCenterState || "";
          break;
        case "diskSize":
          aValue = a.diskSize || 0;
          bValue = b.diskSize || 0;
          break;
        case "memory":
          aValue = a.memory || 0;
          bValue = b.memory || 0;
          break;
        case "issues":
          aValue = a.issueCount || 0;
          bValue = b.issueCount || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return activeSortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return activeSortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [filteredVMs, activeSortIndex, activeSortDirection]);

  // Client-side pagination
  const paginatedVMs = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedVMs.slice(startIndex, endIndex);
  }, [sortedVMs, page, pageSize]);

  // Sort handler
  const getSortParams = (columnIndex: number): ThProps["sort"] => ({
    sortBy: {
      index: activeSortIndex ?? undefined,
      direction: activeSortDirection,
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  // Filter handlers
  const onDiskSizeSelect = (index: number) => {
    setSelectedDiskRange(selectedDiskRange === index ? null : index);
    setPage(1); // Reset to first page
  };

  const onMemorySizeSelect = (index: number) => {
    setSelectedMemoryRange(selectedMemoryRange === index ? null : index);
    setPage(1);
  };

  const onStatusSelect = (status: string) => {
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newStatuses);
    setPage(1);
  };

  const onIssuesFilterToggle = () => {
    setHasIssuesFilter(!hasIssuesFilter);
    setPage(1);
  };

  // Remove individual filter
  const removeFilter = (filterKey: string) => {
    if (filterKey === "diskSize") {
      setSelectedDiskRange(null);
    } else if (filterKey === "memorySize") {
      setSelectedMemoryRange(null);
    } else if (filterKey.startsWith("status-")) {
      const status = filterKey.replace("status-", "");
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else if (filterKey === "hasIssues") {
      setHasIssuesFilter(false);
    }
    setPage(1);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedDiskRange(null);
    setSelectedMemoryRange(null);
    setSelectedStatuses([]);
    setHasIssuesFilter(false);
    setPage(1);
  };

  // Selection handlers (commented out - not needed when checkboxes are hidden)
  // const onSelectVM = (vm: VM, isSelected: boolean) => {
  //   const newSelected = new Set(selectedVMs);
  //   if (isSelected) {
  //     newSelected.add(vm.id);
  //   } else {
  //     newSelected.delete(vm.id);
  //   }
  //   setSelectedVMs(newSelected);
  // };

  // Select all handler
  // const onSelectAll = (isSelected: boolean) => {
  //   if (isSelected) {
  //     const allIds = new Set(sortedVMs.map((vm) => vm.id));
  //     setSelectedVMs(allIds);
  //   } else {
  //     setSelectedVMs(new Set());
  //   }
  // };

  // Check if all VMs are selected
  // const areAllSelected = useMemo(() => {
  //   if (sortedVMs.length === 0) return false;
  //   return sortedVMs.every((vm) => selectedVMs.has(vm.id));
  // }, [sortedVMs, selectedVMs]);

  // Check if some (but not all) VMs are selected
  // const areSomeSelected = useMemo(() => {
  //   if (selectedVMs.size === 0) return false;
  //   return sortedVMs.some((vm) => selectedVMs.has(vm.id)) && !areAllSelected;
  // }, [sortedVMs, selectedVMs, areAllSelected]);

  // Render status cell with icon
  const renderStatus = (vm: VM) => {
    const state = vm.vCenterState || "poweredOff";
    const hasIssues = (vm.issueCount || 0) > 0;

    return (
      <span>
        {state === "poweredOff" && (
          <>
            <ExclamationCircleIcon color="var(--pf-t--global--icon--color--status--danger--default)" />{" "}
          </>
        )}
        {state === "suspended" && (
          <>
            <ExclamationTriangleIcon color="var(--pf-t--global--icon--color--status--warning--default)" />{" "}
          </>
        )}
        {state === "poweredOn" && hasIssues && (
          <>
            <ExclamationTriangleIcon color="var(--pf-t--global--icon--color--status--warning--default)" />{" "}
          </>
        )}
        {state === "poweredOn" && !hasIssues && (
          <>
            <CheckCircleIcon color="var(--pf-t--global--icon--color--status--success--default)" />{" "}
          </>
        )}
        {statusLabels[state] || state}
      </span>
    );
  };

  return (
    <div>
      {/* Toolbar */}
      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup variant="filter-group">
            <ToolbarItem>
              {/* <Checkbox
                id="select-all"
                aria-label="Select all VMs"
                isChecked={areAllSelected || areSomeSelected}
                onChange={(_event, isSelected) => onSelectAll(isSelected)}
              /> */}
              <SearchInput
                placeholder="Find by name"
                value={searchValue}
                onChange={(_event, value) => setSearchValue(value)}
                onClear={() => setSearchValue("")}
              />
            </ToolbarItem>

            {/* Consolidated Filters Dropdown */}
            <ToolbarItem>
              <Dropdown
                isOpen={isFilterOpen}
                onSelect={() => {}}
                onOpenChange={setIsFilterOpen}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    isExpanded={isFilterOpen}
                  >
                    <FilterIcon /> Filters
                  </MenuToggle>
                )}
              >
                <DropdownGroup label="Disk size">
                  <DropdownList>
                    {diskSizeRanges.map((range, index) => (
                      <DropdownItem
                        key={range.label}
                        onClick={() => onDiskSizeSelect(index)}
                        isSelected={selectedDiskRange === index}
                      >
                        {range.label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </DropdownGroup>
                <DropdownGroup label="Memory size">
                  <DropdownList>
                    {memorySizeRanges.map((range, index) => (
                      <DropdownItem
                        key={range.label}
                        onClick={() => onMemorySizeSelect(index)}
                        isSelected={selectedMemoryRange === index}
                      >
                        {range.label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </DropdownGroup>
                <DropdownGroup label="Status">
                  <DropdownList>
                    {Object.entries(statusLabels).map(([status, label]) => (
                      <DropdownItem
                        key={status}
                        onClick={() => onStatusSelect(status)}
                        isSelected={selectedStatuses.includes(status)}
                      >
                        {label}
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </DropdownGroup>
                <DropdownGroup label="Issues">
                  <DropdownList>
                    <DropdownItem
                      onClick={onIssuesFilterToggle}
                      isSelected={hasIssuesFilter}
                    >
                      Has issues
                    </DropdownItem>
                  </DropdownList>
                </DropdownGroup>
              </Dropdown>
            </ToolbarItem>
          </ToolbarGroup>

          <ToolbarGroup>
            <ToolbarItem>
              <Button variant="secondary" isDisabled>
                Send to deep inspection
              </Button>
            </ToolbarItem>
          </ToolbarGroup>

          <ToolbarItem variant="pagination" align={{ default: "alignEnd" }}>
            <Pagination
              itemCount={sortedVMs.length}
              perPage={pageSize}
              page={page}
              onSetPage={(_event, newPage) => setPage(newPage)}
              onPerPageSelect={(_event, newPerPage) => {
                setPageSize(newPerPage);
                setPage(1);
              }}
              variant="top"
              isCompact
            />
          </ToolbarItem>
        </ToolbarContent>

        {/* Applied filters chips */}
        {appliedFilters.length > 0 && (
          <ToolbarContent alignItems="center">
            <ToolbarItem>
              <LabelGroup categoryName="Filters">
                {appliedFilters.map((filter) => (
                  <Label
                    key={filter.key}
                    onClose={() => removeFilter(filter.key)}
                  >
                    {filter.label}
                  </Label>
                ))}
              </LabelGroup>
            </ToolbarItem>
            <ToolbarItem>
              <span>
                {appliedFilters.length} filter
                {appliedFilters.length !== 1 ? "s" : ""} applied
              </span>
            </ToolbarItem>
            <ToolbarItem>
              <Button variant="link" onClick={clearAllFilters}>
                Clear all filters
              </Button>
            </ToolbarItem>
          </ToolbarContent>
        )}
      </Toolbar>

      {/* Table */}
      <Table
        aria-label="Virtual machines table"
        variant="compact"
        borders={false}
      >
        <Thead>
          <Tr>
            {/* <Th screenReaderText="Select" /> */}
            {columns.map((column, index) => (
              <Th
                key={column.key}
                sort={column.sortable ? getSortParams(index) : undefined}
                width={column.key === "issues" ? 10 : undefined}
                modifier={column.key === "issues" ? "fitContent" : undefined}
              >
                {column.label}
              </Th>
            ))}
            <Th width={10} modifier="fitContent" />
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={columns.length + 1}>Loading...</Td>
            </Tr>
          ) : paginatedVMs.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length + 1}>No virtual machines found</Td>
            </Tr>
          ) : (
            paginatedVMs.map((vm) => (
              <Tr key={vm.id}>
                {/* <Td
                  select={{
                    rowIndex: 0,
                    onSelect: (_event, isSelected) => onSelectVM(vm, isSelected),
                    isSelected: selectedVMs.has(vm.id),
                  }}
                /> */}
                <Td dataLabel="Name">
                  {onVMClick ? (
                    <Button
                      variant="link"
                      isInline
                      onClick={() => onVMClick(vm.id)}
                    >
                      {vm.name}
                    </Button>
                  ) : (
                    vm.name
                  )}
                </Td>
                <Td dataLabel="Status">{renderStatus(vm)}</Td>
                <Td dataLabel="Disk size">
                  {formatDiskSize(vm.diskSize || 0)}
                </Td>
                <Td dataLabel="Memory size">
                  {formatMemorySize(vm.memory || 0)}
                </Td>
                <Td dataLabel="Issues" modifier="fitContent">
                  {vm.issueCount || 0}
                </Td>
                <Td isActionCell modifier="fitContent">
                  <Dropdown
                    isOpen={openActionMenuId === vm.id}
                    onSelect={() => setOpenActionMenuId(null)}
                    onOpenChange={(isOpen) =>
                      setOpenActionMenuId(isOpen ? vm.id : null)
                    }
                    toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                      <MenuToggle
                        ref={toggleRef}
                        variant="plain"
                        onClick={() =>
                          setOpenActionMenuId(
                            openActionMenuId === vm.id ? null : vm.id,
                          )
                        }
                        isExpanded={openActionMenuId === vm.id}
                      >
                        <EllipsisVIcon />
                      </MenuToggle>
                    )}
                    popperProps={{ position: "right" }}
                  >
                    <DropdownList>
                      <DropdownItem key="inspect" isDisabled>
                        Send to deep inspection
                      </DropdownItem>
                      <DropdownItem
                        key="details"
                        onClick={() => onVMClick?.(vm.id)}
                      >
                        View details
                      </DropdownItem>
                    </DropdownList>
                  </Dropdown>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
};

VMTable.displayName = "VMTable";

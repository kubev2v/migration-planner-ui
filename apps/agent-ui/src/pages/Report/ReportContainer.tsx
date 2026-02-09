import type { DefaultApiInterface } from "@migration-planner-ui/agent-client/apis";
import type { Inventory, VM } from "@migration-planner-ui/agent-client/models";
import { useInjection } from "@migration-planner-ui/ioc";
import {
  Content,
  MenuToggle,
  type MenuToggleElement,
  PageSection,
  Select,
  SelectList,
  SelectOption,
  Stack,
  StackItem,
  Tab,
  Tabs,
  TabTitleText,
} from "@patternfly/react-core";
import type React from "react";
import { useEffect, useState } from "react";
import { useAgentStatus } from "../../common/AgentStatusContext";
import {
  DataSharingAlert,
  DataSharingModal,
} from "../../common/components/index";
import { Symbols } from "../../main/Symbols";
import { buildClusterViewModel, type ClusterOption } from "./clusterView";
import { Dashboard, VirtualMachinesView } from "./components/index";
import { Header } from "./Header";

export const ReportContainer: React.FC = () => {
  const agentApi = useInjection<DefaultApiInterface>(Symbols.AgentApi);
  const { agentStatus, refetch: refetchAgentStatus } = useAgentStatus();
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [vmsList, setVmsList] = useState<VM[]>([]);
  const [vmsLoading, setVmsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | number>(0);
  const [selectedClusterId, setSelectedClusterId] = useState<string>("all");
  const [isClusterSelectOpen, setIsClusterSelectOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);
  // Fetch inventory only (agent status comes from context)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const inventoryData = await agentApi.getInventory();
        setInventory(inventoryData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load data";
        setError(errorMessage);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [agentApi]);

  // Fetch VMs when Virtual Machines tab is active
  useEffect(() => {
    if (activeTab !== 1) return;

    const fetchVMs = async () => {
      try {
        setVmsLoading(true);
        const pageSize = 100;
        let allVMs: VM[] = [];
        let currentPage = 1;
        let totalVMs = 0;

        // Fetch first page to get total count
        const firstResponse = await agentApi.getVMs({
          page: currentPage,
          pageSize,
        });
        allVMs = firstResponse.vms || [];
        totalVMs = firstResponse.total || 0;

        // Calculate total pages needed
        const totalPages = Math.ceil(totalVMs / pageSize);

        // Fetch remaining pages if there are more
        while (currentPage < totalPages) {
          currentPage++;
          const response = await agentApi.getVMs({
            page: currentPage,
            pageSize,
          });
          allVMs = [...allVMs, ...(response.vms || [])];
        }

        setVmsList(allVMs);
      } catch (err) {
        console.error("Error fetching VMs:", err);
        setVmsList([]);
      } finally {
        setVmsLoading(false);
      }
    };

    fetchVMs();
  }, [activeTab, agentApi]);

  if (loading) {
    return (
      <Stack hasGutter>
        <StackItem>
          <Content component="p">Loading inventory data...</Content>
        </StackItem>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack hasGutter>
        <StackItem>
          <Content component="p">Error: {error}</Content>
        </StackItem>
      </Stack>
    );
  }

  if (!inventory) {
    return (
      <Stack hasGutter>
        <StackItem>
          <Content component="p">No inventory data available.</Content>
        </StackItem>
      </Stack>
    );
  }

  // Extract data from inventory
  const infra = inventory.vcenter?.infra;
  const vms = inventory.vcenter?.vms;
  const clusters = inventory.clusters || {};

  const totalVMs = vms?.total || 0;
  const totalClusters = Object.keys(clusters).length;

  // Build cluster view model
  const clusterView = buildClusterViewModel({
    infra,
    vms,
    clusters,
    selectedClusterId,
  });

  const clusterSelectDisabled = clusterView.clusterOptions.length <= 1;
  const isDataShared = agentStatus?.mode === "connected";

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const handleShareConfirm = async () => {
    setIsShareLoading(true);
    setShareError(null); // Clear any previous errors
    try {
      await agentApi.setAgentMode({ agentModeRequest: { mode: "connected" } });
      // Refresh agent status from context
      await refetchAgentStatus();
      // Clear error and close modal on success
      setShareError(null);
      setIsShareModalOpen(false);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to enable data sharing. Please try again.";
      setShareError(errorMessage);
      console.error("Error changing agent mode:", err);
      // Keep modal open on error so user can retry
    } finally {
      setIsShareLoading(false);
    }
  };

  const handleShareCancel = () => {
    setShareError(null); // Clear error when cancelling
    setIsShareModalOpen(false);
  };

  const handleClusterSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined,
  ): void => {
    if (typeof value === "string") {
      setSelectedClusterId(value);
      // Reset to Overview tab when changing cluster
      setActiveTab(0);
    }
    setIsClusterSelectOpen(false);
  };

  return (
    <PageSection hasBodyWrapper={false} isFilled style={{ padding: "24px" }}>
      <Stack hasGutter>
        {/* Header with cluster selector */}
        <StackItem>
          <Header
            totalVMs={totalVMs}
            totalClusters={totalClusters}
            isConnected={isDataShared}
          />
        </StackItem>

        {/* Data Sharing Alert - shown when not shared */}
        {!isDataShared && (
          <StackItem>
            <DataSharingAlert onShare={handleShareClick} />
          </StackItem>
        )}

        {/* Cluster Selector */}
        <StackItem>
          <Select
            isScrollable
            isOpen={isClusterSelectOpen}
            selected={clusterView.selectionId}
            onSelect={handleClusterSelect}
            onOpenChange={(isOpen: boolean) => {
              if (!clusterSelectDisabled) setIsClusterSelectOpen(isOpen);
            }}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                isExpanded={isClusterSelectOpen}
                onClick={() => {
                  if (!clusterSelectDisabled) {
                    setIsClusterSelectOpen((prev) => !prev);
                  }
                }}
                isDisabled={clusterSelectDisabled}
                style={{ minWidth: "422px" }}
              >
                {clusterView.selectionLabel}
              </MenuToggle>
            )}
          >
            <SelectList>
              {clusterView.clusterOptions.map((option: ClusterOption) => (
                <SelectOption key={option.id} value={option.id}>
                  {option.label}
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        </StackItem>

        {/* Tabs */}
        <StackItem>
          <Tabs
            activeKey={activeTab}
            onSelect={(_event, tabIndex) => setActiveTab(tabIndex)}
          >
            <Tab eventKey={0} title={<TabTitleText>Overview</TabTitleText>}>
              <div style={{ marginTop: "24px" }}>
                {clusterView.viewInfra && clusterView.viewVms ? (
                  <Dashboard
                    infra={clusterView.viewInfra}
                    cpuCores={clusterView.cpuCores}
                    ramGB={clusterView.ramGB}
                    vms={clusterView.viewVms}
                    clusters={clusterView.viewClusters}
                    isAggregateView={clusterView.isAggregateView}
                    clusterFound={clusterView.clusterFound}
                  />
                ) : (
                  <Content component="p">
                    {clusterView.isAggregateView
                      ? "This assessment does not have report data yet."
                      : "No data is available for the selected cluster."}
                  </Content>
                )}
              </div>
            </Tab>
            <Tab
              eventKey={1}
              title={<TabTitleText>Virtual Machines</TabTitleText>}
            >
              <div style={{ marginTop: "24px" }}>
                <VirtualMachinesView vms={vmsList} loading={vmsLoading} />
              </div>
            </Tab>
          </Tabs>
        </StackItem>
      </Stack>

      <DataSharingModal
        isOpen={isShareModalOpen}
        onConfirm={handleShareConfirm}
        onCancel={handleShareCancel}
        isLoading={isShareLoading}
        error={shareError}
      />
    </PageSection>
  );
};

ReportContainer.displayName = "ReportContainer";

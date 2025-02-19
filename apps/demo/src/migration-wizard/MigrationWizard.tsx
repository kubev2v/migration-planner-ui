import React from "react";
import {
  Button,
  useWizardContext,
  Wizard,
  WizardFooterWrapper,
  WizardStep,
} from "@patternfly/react-core";
import { ConnectStep } from "./steps/connect/ConnectStep";
import { DiscoveryStep } from "./steps/discovery/DiscoveryStep";
import { useComputedHeightFromPageHeader } from "./hooks/UseComputedHeightFromPageHeader";
import { useDiscoverySources } from "./contexts/discovery-sources/Context";
import { PrepareMigrationStep } from "./steps/prepare-migration/PrepareMigrationStep";

const openAssistedInstaller = (): void => {
  window.open(
    "https://console.dev.redhat.com/openshift/assisted-installer/clusters/~new?source=assisted_migration",
    "_blank"
  );
};

type CustomWizardFooterPropType = {
  isCancelHidden?: boolean;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextButtonText?: string;
  onNext?: () => void;
};

export const CustomWizardFooter: React.FC<CustomWizardFooterPropType> = ({
  isCancelHidden,
  isBackDisabled,
  isNextDisabled,
  nextButtonText,
  onNext,
}): JSX.Element => {
  const { goToNextStep, goToPrevStep, goToStepById } = useWizardContext();
  return (
    <>
      <WizardFooterWrapper>        
        <Button
          ouiaId="wizard-back-btn"
          variant="secondary"
          onClick={goToPrevStep}
          isDisabled={isBackDisabled}
        >
          Back
        </Button>
        <Button
          ouiaId="wizard-next-btn"
          variant="primary"
          onClick={() => {
            if (onNext) {
              onNext();
            } else {
              goToNextStep();
            }
          }}
          isDisabled={isNextDisabled}
        >
          {nextButtonText ?? "Next"}
        </Button>
        {!isCancelHidden && (
          <Button
            ouiaId="wizard-cancel-btn"
            variant="link"
            onClick={() => goToStepById("connect-step")}
          >
            Cancel
          </Button>
        )}
      </WizardFooterWrapper>
    </>
  );
};

export const MigrationWizard: React.FC = () => {
  const computedHeight = useComputedHeightFromPageHeader();
  const discoverSourcesContext = useDiscoverySources();
  const isDiscoverySourceUpToDate =
  (discoverSourcesContext.sourceSelected?.agent && discoverSourcesContext.sourceSelected?.agent.status === "up-to-date") || discoverSourcesContext.sourceSelected?.name === 'Example';

  return (
    <Wizard height={computedHeight} style={{ overflow: "hidden" }}>
      <WizardStep
        name="Connect"
        id="connect-step"
        footer={
          <CustomWizardFooter
            isCancelHidden={true}
            isNextDisabled={
              !isDiscoverySourceUpToDate ||
              discoverSourcesContext.sourceSelected === null
            }
            isBackDisabled={true}
          />
        }
      >
        <ConnectStep />
      </WizardStep>
      <WizardStep
        name="Discover"
        id="discover-step"
        footer={<CustomWizardFooter isCancelHidden={true} />}
        isDisabled={
          (discoverSourcesContext.sourceSelected?.agent && discoverSourcesContext.sourceSelected?.agent.status !== "up-to-date") ||
          discoverSourcesContext.sourceSelected === null  || discoverSourcesContext.sourceSelected?.agent === undefined
        }
      >
        <DiscoveryStep />
      </WizardStep>
      <WizardStep
        name="Plan"
        id="plan-step"
        footer={
          <CustomWizardFooter
            nextButtonText={"Let's create a new cluster"}
            onNext={openAssistedInstaller}
            isNextDisabled={discoverSourcesContext.sourceSelected?.name === 'Example'}
          />
        }
        isDisabled={
          (discoverSourcesContext.sourceSelected?.agent && discoverSourcesContext.sourceSelected?.agent.status !== "up-to-date") ||
          discoverSourcesContext.sourceSelected === null || discoverSourcesContext.sourceSelected?.agent === undefined
        }
      >
        <PrepareMigrationStep />
      </WizardStep>
    </Wizard>
  );
};

MigrationWizard.displayName = "MigrationWizard";

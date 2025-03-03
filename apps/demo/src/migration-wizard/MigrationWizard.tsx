import React, { useEffect } from "react";
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
import { Source } from "@migration-planner-ui/api-client/models";

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
  const [firstSource, ..._otherSources] = discoverSourcesContext.sources ?? [];  
  const [sourceSelected,setSourceSelected] = React.useState<Source>();
  const [isDiscoverySourceUpToDate,setIsDiscoverySourceUpToDate] = React.useState<boolean>(false);

  useEffect(() => {
    if (discoverSourcesContext.sourceSelected) {
      const foundSource:Source = discoverSourcesContext.sources.find(
        (source) => source.id === discoverSourcesContext.sourceSelected?.id
      );
      if (foundSource) {
        setSourceSelected(foundSource);
        setIsDiscoverySourceUpToDate( 
          foundSource.agent && foundSource.agent.status === "up-to-date" || foundSource.name === 'Example');      
      } else {
        if (firstSource) {
          setSourceSelected(firstSource);
          setIsDiscoverySourceUpToDate( 
            firstSource.agent && firstSource.agent.status === "up-to-date" || firstSource.name === 'Example');     
        }  
        else {
          setSourceSelected(undefined);
          setIsDiscoverySourceUpToDate(false);
        }
      }
    }
  }, [discoverSourcesContext.sourceSelected, discoverSourcesContext.sources, firstSource]);
  
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
              sourceSelected === null
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
          (sourceSelected?.agent && sourceSelected?.agent.status !== "up-to-date") ||
          sourceSelected === null  || sourceSelected?.agent === undefined
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
            isNextDisabled={sourceSelected?.name === 'Example'}
          />
        }
        isDisabled={
          (sourceSelected?.agent && sourceSelected?.agent.status !== "up-to-date") ||
          sourceSelected === null || sourceSelected?.agent === undefined
        }
      >
        <PrepareMigrationStep />
      </WizardStep>
    </Wizard>
  );
};

MigrationWizard.displayName = "MigrationWizard";

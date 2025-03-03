import React, { useCallback, useEffect, useState } from "react";
import { Tooltip, Button, Icon, Modal } from "@patternfly/react-core";
import { UploadIcon } from "@patternfly/react-icons";

interface UploadInventoryProps {
  discoverySourcesContext: DiscoverySources.Context;
  sourceId: string;
  asLink?: boolean;
}

export const UploadInventoryAction: React.FC<UploadInventoryProps> = ({
  discoverySourcesContext,
  sourceId,
  asLink
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (discoverySourcesContext.errorUpdatingSource) {
      setModalMessage("Failed to import inventory. Please check the file format.");
      setIsModalOpen(true);
    }
  }, [discoverySourcesContext.errorUpdatingSource]);

  const handleUploadSource = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.style.visibility = "hidden";

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    input.onchange = async (event: Event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0];
      if (!file) return;

      const maxSize = 12582912; // 12 MiB
      if (file.size > maxSize) {
        setModalMessage("The file is too big. Upload a file up to 12 MiB.");
        setIsModalOpen(true);
        return;
      }

      try {
        const content = await file.text();
        await discoverySourcesContext.updateSource(sourceId, JSON.parse(content));
        setModalMessage("Inventory successfully uploaded.");        
      } finally {
        setIsModalOpen(true);
        input.remove();
      }
    };

    document.body.appendChild(input);
    input.click();
  }, [discoverySourcesContext, sourceId]);

 
  return (
    <>
    {asLink ? (
        <Button variant="link" onClick={handleUploadSource} style={{padding:0, marginTop: '5px'}}>
          Upload discovery file
        </Button>
      ) : (
        <Tooltip content="Upload">
          <Button variant="plain" onClick={handleUploadSource}>
            <Icon size="md" isInline>
              <UploadIcon />
            </Icon>
          </Button>
        </Tooltip>
      )}
      <Modal
        title="Upload Discovery File Status"
        isOpen={isModalOpen}
        onClose={handleModalClose}
        variant="small"
      >
        <p>{modalMessage}</p>
      </Modal>
    </>
  );
};

UploadInventoryAction.displayName = "UploadInventoryAction";
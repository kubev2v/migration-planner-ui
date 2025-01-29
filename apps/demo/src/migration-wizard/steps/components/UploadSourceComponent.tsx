import React, { useCallback } from "react";
import { Button } from "@patternfly/react-core";

interface UploadSourceButtonProps {
    discoverySourcesContext: DiscoverySources.Context;
  }
  
  export const UploadSourceButton: React.FC<UploadSourceButtonProps> = ({
    discoverySourcesContext,
  }) => {

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
        alert("The file is too big. Upload a file up to 12 MiB.");
        return;
      }

      try {
        const content = await file.text();
        const json = JSON.parse(content);
        await discoverySourcesContext.createSourceFromJson(json);
        alert("Source imported successfully.");
      } catch (error) {
        console.error("Error importing source:", error);
        alert("Failed to import source. Please check the file format.");
      } finally {
        input.remove();
      }
    };

    document.body.appendChild(input);
    input.click();
  }, [discoverySourcesContext]);

  return (
    <Button variant="secondary" onClick={handleUploadSource}   style={{ marginLeft: "1rem" }}>
      Upload inventory
    </Button>
  );
};

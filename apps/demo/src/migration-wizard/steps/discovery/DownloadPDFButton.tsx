import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button, TreeView, TreeViewDataItem } from "@patternfly/react-core";
import { createRoot } from "react-dom/client";

interface DownloadPDFButtonProps {
  elementId: string;
  treeViewData: TreeViewDataItem[];
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({
  elementId,
  treeViewData,
}) => {
  const hiddenContainerRef = useRef<HTMLDivElement | null>(null);

  const assignUniqueIds = (
    data: TreeViewDataItem[],
    parentId: string = "download"
  ): TreeViewDataItem[] => {
    return data.map((item, index) => {
      const uniqueId = `${item.id}-${parentId}-${index}`; 
      return {
        ...item,
        id: uniqueId, 
        key: uniqueId, 
        children: item.children
          ? assignUniqueIds(item.children, uniqueId)
          : undefined, 
      };
    });
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleDownloadPDF = async () => {
    try {
      const originalWarn = console.warn;
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      console.warn = () => {};
      const hiddenContainer = hiddenContainerRef.current;
      
      if (!hiddenContainer) return;
      hiddenContainer.innerHTML = "";
      const treeClone = (
        <TreeView
          id={`${elementId}-clone`}
          aria-label="Cloned Discovery Report"
          variant="compactNoBackground"
          data={assignUniqueIds(treeViewData, elementId)}
          allExpanded={true}
        />
      );

      const tempDiv = document.createElement("div");
      hiddenContainer.appendChild(tempDiv);
      const root = createRoot(tempDiv);
      root.render(treeClone);

      
      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(hiddenContainer, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const scaleFactor = Math.min(
        contentWidth / imgWidth,
        contentHeight / imgHeight
      );

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        imgWidth * scaleFactor,
        imgHeight * scaleFactor
      );
      pdf.save("Discovery_Report.pdf");

      hiddenContainer.innerHTML = "";
      console.warn = originalWarn;
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={handleDownloadPDF}>
        Export PDF
      </Button>     
      <div
        id="hidden-container"
        ref={hiddenContainerRef}
        style={{ position: "absolute", left: "-9999px", visibility: "visible" }}
      />
    </>
  );
};

export default DownloadPDFButton;

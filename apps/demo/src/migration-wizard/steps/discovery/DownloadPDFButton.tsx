import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@patternfly/react-core";

interface DownloadPDFButtonProps {
    elementId: string; 
    onBeforeDownload: (callback: () => Promise<void>) => void; 
  }
  
  const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ elementId, onBeforeDownload }) => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handleDownloadPDF = async () => {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      const generatePDF = async () => {
        const element = document.getElementById(elementId);
        if (!element) return;

        // Hide download button
        const button = document.getElementById("download-pdf-button");
        if (button) button.style.display = "none";
  
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
  
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;

        const contentWidth = pageWidth - margin * 2;
        const contentHeight = pageHeight - margin * 2;

        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
  
        const scaleFactor = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);

        const imgX = margin;
        const imgY = margin;
  
        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imgWidth * scaleFactor,
          imgHeight * scaleFactor
        );
        pdf.save("Discovery_Report.pdf");

         // Show download button
        if (button) button.style.display = "block";
      };
  
      // Llama al callback para forzar la expansión antes de generar el PDF
      onBeforeDownload(generatePDF);
     
    };

  return (
    <Button variant="secondary" onClick={handleDownloadPDF} id="download-pdf-button" >
     Export to PDF
    </Button>
  );
};

export default DownloadPDFButton;

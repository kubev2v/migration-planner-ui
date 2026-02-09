import type { MigrationIssue } from "@migration-planner-ui/agent-client/models";
import { Card, CardBody, CardTitle, Icon } from "@patternfly/react-core";
import { ExclamationTriangleIcon } from "@patternfly/react-icons";
import type React from "react";
import { dashboardStyles } from "./dashboardStyles";
import { ReportTable } from "./ReportTable";

interface WarningsTableProps {
  warnings: MigrationIssue[];
  isExportMode?: boolean;
}

export const WarningsTable: React.FC<WarningsTableProps> = ({
  warnings,
  isExportMode = false,
}) => {
  return (
    <Card
      className={
        isExportMode ? dashboardStyles.cardPrint : dashboardStyles.card
      }
      id="warnings-table"
    >
      <CardTitle>
        <Icon status="warning">
          <ExclamationTriangleIcon />
        </Icon>{" "}
        Warnings
      </CardTitle>
      <CardBody>
        <div>
          <ReportTable<MigrationIssue>
            data={warnings}
            columns={["Description", "Total VMs"]}
            fields={["assessment", "count"]}
            withoutBorder
          />
        </div>
      </CardBody>
    </Card>
  );
};

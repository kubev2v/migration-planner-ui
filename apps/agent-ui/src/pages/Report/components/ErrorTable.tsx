import type { MigrationIssue } from "@migration-planner-ui/agent-client/models";
import { Card, CardBody, CardTitle, Icon } from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons";
import type React from "react";
import { ReportTable } from "./ReportTable";

interface ErrorTableProps {
  errors: MigrationIssue[];
  isExportMode?: boolean;
}

export const ErrorTable: React.FC<ErrorTableProps> = ({
  errors,
  isExportMode = false,
}) => {
  return (
    <Card
      className={isExportMode ? "dashboard-card-print" : "dashboard-card"}
      id="errors-table"
    >
      <CardTitle>
        <Icon status="danger">
          <ExclamationCircleIcon />
        </Icon>{" "}
        Errors
      </CardTitle>
      <CardBody>
        {errors.length === 0 ? (
          <div>No errors found</div>
        ) : (
          <div>
            <ReportTable<MigrationIssue>
              data={errors}
              columns={["Description", "Total VMs"]}
              fields={["assessment", "count"]}
              withoutBorder
            />
          </div>
        )}
      </CardBody>
    </Card>
  );
};

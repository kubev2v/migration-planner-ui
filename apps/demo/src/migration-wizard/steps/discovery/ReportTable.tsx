import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ReportTable {
  export type Props<DataList extends Array<unknown>> = {
    columns: string[];
    data: DataList;
    fields: Array<keyof DataList[0]>;
    style?: React.CSSProperties;
  };
}

export function ReportTable<DataItem>(
  props: ReportTable.Props<DataItem[]>
): React.ReactNode {
  const { columns, data, fields, style } = props;

  return (
    <Table
      variant="compact"
      borders={true}
      style={{ border: "1px solid lightgray", borderRight: "none", ...style }}
    >
      <Thead>
        <Tr>
          {columns.map((name) => (
            <Th hasRightBorder>{name}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => (
          <Tr key={idx}>
            {fields.map((f) => (
              <Td hasRightBorder> {item[f] === "" ? "-" : (item[f] as React.ReactNode)}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

ReportTable.displayName = "ReportTable";

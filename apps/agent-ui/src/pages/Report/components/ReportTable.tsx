import { Table, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import type React from "react";

export interface ReportTableProps<DataItem> {
  columns: string[];
  data: DataItem[];
  fields: Array<keyof DataItem>;
  style?: React.CSSProperties;
  withoutBorder?: boolean;
  caption?: string;
}

export function ReportTable<DataItem>(
  props: ReportTableProps<DataItem>,
): React.ReactNode {
  const {
    columns,
    data,
    fields,
    style,
    withoutBorder = false,
    caption,
  } = props;

  return (
    <Table variant="compact" borders={!withoutBorder} style={style}>
      {caption && <caption>{caption}</caption>}
      <Thead>
        <Tr>
          {columns.map((name) => (
            <Th key={name} hasRightBorder={!withoutBorder}>
              {name}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => (
          <Tr key={`row-${idx}-${String(item[fields[0]])}`}>
            {fields.map((f) => (
              <Td key={String(f)} hasRightBorder={!withoutBorder}>
                {item[f] === "" || item[f] == null
                  ? "-"
                  : typeof item[f] === "boolean"
                    ? item[f]
                      ? "True"
                      : "False"
                    : (item[f] as React.ReactNode)}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

ReportTable.displayName = "ReportTable";

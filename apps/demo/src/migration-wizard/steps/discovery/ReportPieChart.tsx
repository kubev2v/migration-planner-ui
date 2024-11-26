import React from "react";
import { ChartPie, ChartThemeColor } from "@patternfly/react-charts";
import { TextContent, Text } from "@patternfly/react-core";

type ChartBarDataEntry = {
  name: string;
  x: string;
  y: number;
};


function histogramToPieChartData(
  histogram: ReportPieChart.Histogram,
  name: string,
): ChartBarDataEntry[] {
  const { data } = histogram;
  console.log(data);
  return data.map((y, idx) => ({
    name,
    x: `${idx + 1} ${name}`, // Cambia esto según tus necesidades
    y,
  }));
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ReportPieChart {
  export type Histogram = {
    data: number[];
    minValue: number;
    step: number;
  };

  export type Props = {
    histogram: Histogram;
    title: string;
  };
}

export function ReportPieChart(props: ReportPieChart.Props): React.ReactNode {
  const { title, histogram } = props;
  console.log(title);
  return (
    <>
      <TextContent style={{ textAlign: "center" }}>
        <Text>{title}</Text>
      </TextContent>
      <ChartPie
        name={title.toLowerCase().split(" ").join("-")}
        ariaDesc={title + " chart"}
        ariaTitle={title + " chart"}
        constrainToVisibleArea
        data={histogramToPieChartData(histogram, title)}
        height={230}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        legendData={histogramToPieChartData(histogram, '').map(d => ({ name: `${d.x}: ${d.y}` }))}
        legendOrientation="vertical"
        legendPosition="right"
        padding={{
          bottom: 20,
          left: 20,
          right: 140, // Adjusted to accommodate legend
          top: 20,
        }}
        width={350}
        themeColor={ChartThemeColor.blue}
      />
    </>
  );
}

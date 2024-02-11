import { ResponsiveLine } from "@nivo/line";

export default function PotChart({ potData, id, scheme }) {
  const data = [
    {
      id: id,
      data: potData.map((item) => ({
        x: new Date(item.mesure_DT),
        y: item.data,
      })),
    },
  ];

  const maxY = Math.max(...data[0].data.map((obj) => obj.y)) + 2;
  const minY = Math.min(...data[0].data.map((obj) => obj.y)) - 2;

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 30, bottom: 50, left: 50 }}
      xScale={{
        type: "time",
        format: "%H시%M분",
        precision: "minute",
        useUTC: false,
      }}
      xFormat="time: %H시%M분"
      yScale={{
        type: "linear",
        min: minY,
        max: maxY,
        stacked: true,
        reverse: false,
      }}
      yFormat=" <-.2f"
      // axisTop={null}
      // axisRight={null}
      axisBottom={{
        tickValues: "every 2 hour",
        tickSize: 3,
        format: "%H시",
        legend: "시간",
        legendOffset: 36,
        legendPosition: "start",
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: id,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      gridXValues="every 2 hour"
      colors={{ scheme: scheme }}
      enableArea={false}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      // legends={[
      //   {
      //     anchor: "bottom-right",
      //     direction: "column",
      //     justify: false,
      //     translateX: 100,
      //     translateY: 0,
      //     itemsSpacing: 0,
      //     itemDirection: "left-to-right",
      //     itemWidth: 80,
      //     itemHeight: 20,
      //     itemOpacity: 0.75,
      //     symbolSize: 12,
      //     symbolShape: "circle",
      //     symbolBorderColor: "rgba(0, 0, 0, .5)",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemBackground: "rgba(0, 0, 0, .03)",
      //           itemOpacity: 1,
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
}

import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";
import DataSet from "@antv/data-set";

const { DataView } = DataSet;
const { Html } = Guide;
const data = [
      {
        item: "Aguilhado",
        count: 40
      },
      {
        item: "ABS Prime",
        count: 21
      },
      {
        item: "Alfredo",
        count: 17
      },
      {
        item: "Amancio",
        count: 13
      },
      {
        item: "Capane",
        count: 9
      }
];
const dv = new DataView();
dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent"
});
const cols = {
    percent: {
        formatter: val => {
            val = val * 100 + "%";
            return val;
        }
    }
};

function IntervalStackChart({  }){
    return(
        <div style={{marginLeft: -0}}>
        <Chart
          height={400}
          data={dv}
          scale={cols}
          padding={[0, 0, 0, 0]}
          forceFit
        >
          <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
          <Axis name="percent" />
          <Legend
            position="right"
            offsetY={-400 / 2 + 120}
            offsetX={-100}
          />
          <Tooltip
            showTitle={false}
            itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
          />
          <Guide>
            <Html
              position={["50%", "50%"]}
              html="<div style=&quot;color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;&quot;>Inseminações<br><span style=&quot;color:#262626;font-size:2.5em&quot;>3540</span></div>"
              alignX="middle"
              alignY="middle"
            />
          </Guide>
          <Geom
            type="intervalStack"
            position="percent"
            color="item"
            tooltip={[
              "item*percent",
              (item, percent) => {
                percent = percent * 100 + "%";
                return {
                  name: item,
                  value: percent
                };
              }
            ]}
            style={{
              lineWidth: 5,
              stroke: "#fff"
            }}
          >
            <Label
              content="percent"
              formatter={(val, item) => {
                return item.point.item + ": " + val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    )
}

export default IntervalStackChart;
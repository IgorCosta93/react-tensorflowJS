import React from "react";
import DataSet from "@antv/data-set";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,
} from "bizcharts";

const data = [
    {
      "name": "Inseminados",
      "Santo Antonio": 350,
      "Jacutinga": 430,
      "St. Marcos": 250,
      "Paraiso": 540,
      "São Vicente": 150,
      "Água Santa": 320,
      "São Francisco": 270,
      "Chapecó": 340
    },
    {
      "name": "PIA",
      "Santo Antonio": 240,
      "Jacutinga": 310,
      "St. Marcos": 170,
      "Paraiso": 350,
      "São Vicente": 85,
      "Água Santa": 240,
      "São Francisco": 180,
      "Chapecó": 260
    }
];

const ds = new DataSet();
const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["Santo Antonio", "Jacutinga", "St. Marcos", "Paraiso", "São Vicente", "Água Santa", "São Francisco", "Chapecó"],
      // 展开字段集
      key: "月份",
      // key字段
      value: "月均降雨量" // value字段
});

function BarChart({}){
    return(
        <div style={{marginLeft: -50 }}>
            <Chart height={400} data={dv} forceFit>
            <Axis name="月份" />
            <Axis name="月均降雨量" />
            <Legend />
            <Tooltip
                crosshairs={{
                type: "y"
                }}
            />
            <Geom
                type="interval"
                position="月份*月均降雨量"
                color={"name"}
                adjust={[
                {
                    type: "dodge",
                    marginRatio: 1 / 32
                }
                ]}
            />
            </Chart>
        </div>
    )
}

export default BarChart;
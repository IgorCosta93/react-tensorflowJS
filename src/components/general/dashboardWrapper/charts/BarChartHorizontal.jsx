import React from "react";
import {
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Legend
} from "bizcharts";
import DataSet from "@antv/data-set";

const data = [
    {
      label: "Arthur G.",
      Inseminados: 2800,
      PIA: 2260
    },
    {
      label: "Thiago L.",
      Inseminados: 1800,
      PIA: 1300
    },
    {
      label: "Luiz M.",
      Inseminados: 950,
      PIA: 900
    },
    {
      label: "Izabela M.",
      Inseminados: 500,
      PIA: 390
    },
    {
      label: "Augusto B.",
      Inseminados: 170,
      PIA: 100
    }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: "fold",
    fields: ["Inseminados", "PIA"],
    key: "type",
    value: "value" 
});

function BarChartHorizontal({ }){
    return(
        <div>
        <Chart height={450} data={dv} forceFit>
          <Legend />
          <Coord transpose scale={[1, -1]} />
          <Axis
            name="label"
            label={{
              offset: 8
            }}
          />
          <Axis name="value" position={"right"} />
          <Tooltip />
          <Geom
            type="interval"
            position="label*value"
            color={"type"}
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

export default BarChartHorizontal;
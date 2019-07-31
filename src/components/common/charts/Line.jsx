import React from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend
} from "bizcharts";

function Line({data}){
    
    const cols = {
        label: {
          range: [0, 1]
        }
    };
    
    return(
        <Chart height={400} data={data} scale={cols} forceFit>
            <Legend />
            <Axis name="label" />
            <Axis
                name="value"
                label={{
                    formatter: val => `${val}`
                }}
            />
            <Tooltip
                crosshairs={{
                type: "y"
                }}
            />
            <Geom
                type="line"
                position="label*value"
                size={2}
                color={"feature"}
                shape={"smooth"}
            />
            <Geom
                type="point"
                position="label*value"
                size={4}
                shape={"circle"}
                color={"feature"}
                style={{
                    stroke: "#fff",
                    lineWidth: 1
                }}
            />
        </Chart>
    )
}

export default Line;
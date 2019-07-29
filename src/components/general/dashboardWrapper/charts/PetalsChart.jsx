import React from "react";
import {
    Chart,
    Geom,
    Tooltip,
    Coord,
    Legend
} from "bizcharts";

const data = [
    {
      year: "Descarte",
      population: 41.8
    },
    {
      year: "Multipara",
      population: 38
    },
    {
      year: "Novilha",
      population: 33.7
    },
    {
      year: "Novilha Precoce",
      population: 30.7
    },
    {
      year: "Nulipara",
      population: 43
    },
    {
      year: "Primipara",
      population: 29
    },
    {
      year: "Secundipara",
      population: 36
    },
    {
      year: "Solteira",
      population: 46
    }
];

function PetalsChart({}){
    return (
        <div style={{marginLeft: -100}}>
          <Chart height={400} data={data} padding="auto" forceFit>
            <Coord type="polar" />
            <Tooltip />
            <Legend
              position="right"
              offsetY={-400 / 2 + 100}
              offsetX={-80}
            />
            <Geom
              type="interval"
              color="year"
              position="year*population"
              style={{
                lineWidth: 3,
                stroke: "#fff"
              }}
            />
          </Chart>
        </div>
    );
}

export default PetalsChart;
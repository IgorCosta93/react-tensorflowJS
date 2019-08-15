import React, { Fragment, useEffect } from "react";
import _ from "lodash";
import * as Plotly from "plotly.js";
import { Row } from 'antd';

function PieChart({data}){

    const renderOutcomes = data => {
        const outcomes = data.map(r => r.Outcome);
      
        const [diabetic, healthy] = _.partition(outcomes, o => o === 1);
      
        const chartData = [
            {
                labels: ["Diabetic", "Healthy"],
                values: [diabetic.length, healthy.length],
                type: "pie",
                opacity: 0.6,
                marker: {
                    colors: ["gold", "forestgreen"]
                }
            }
        ];
      
        Plotly.newPlot("outcome-cont", chartData, {
            title: "Healthy vs Diabetic"
        });
    };

    useEffect(() => {
        renderOutcomes(data);
    })

    return(
        <Fragment>
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="outcome-cont"></div>
            </Row>
        </Fragment>
    )
}

export default PieChart;
import React, { Fragment, useEffect } from "react";
import { renderHistogram, renderScatter } from "../functions";
import { Row, Divider } from 'antd';

function HistogramCharts({data}){

    useEffect(() => {
        renderHistogram("insulin-cont", data, "Insulin", {
            title: "Insulin levels",
            xLabel: "Insulin 2-hour serum, mu U/ml"
        });
        
        renderHistogram("glucose-cont", data, "Glucose", {
            title: "Glucose concentration",
            xLabel: "Plasma glucose concentration (2 hour after glucose tolerance test)"
        });
        
        renderHistogram("age-cont", data, "Age", {
            title: "Age",
            xLabel: "age (years)"
        });
        
        renderScatter("glucose-age-cont", data, ["Glucose", "Age"], {
            title: "Glucose vs Age",
            xLabel: "Glucose",
            yLabel: "Age"
        });
        
        renderScatter("skin-bmi-cont", data, ["SkinThickness", "BMI"], {
            title: "Skin thickness vs BMI",
            xLabel: "Skin thickness",
            yLabel: "BMI"
        });
    })

    return(
        <Fragment>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="insulin-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="glucose-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="age-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="glucose-age-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="skin-bmi-cont"></div>
            </Row>
            <Divider />
        </Fragment>
    )
}

export default HistogramCharts;
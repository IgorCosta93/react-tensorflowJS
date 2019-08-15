import React, { Fragment, useState, useEffect } from "react";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from '@tensorflow/tfjs';
import { Button, Select, Row, Form, Input, Divider } from 'antd';
import * as Papa from "papaparse";
import _ from "lodash";
import * as Plotly from "plotly.js";

function PredictingDiabetes(){
    let [ data, setData ] = useState([]);
    let [ model, setModel ] = useState();

    Papa.parsePromise = function(file) {
        return new Promise(function(complete, error) {
            Papa.parse(file, {
                header: true,
                download: true,
                dynamicTyping: true,
                complete,
                error      
            });
        });
    };

    const loadData = async () => {
        const csv = await Papa.parsePromise(
            "https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlo\w-js/master/src/data/diabetes.csv"
        );
        return csv.data;
    };

    async function start(){
        if(data.length === 0){
            const newData = await loadData();
            console.log(newData)
            setData(data = newData)
        }
        renderOutcomes(data);
    }

    const oneHot = outcome => Array.from(tf.oneHot(outcome, 2).dataSync());

    const createDataSets = (data, features, testSize, batchSize) => {
        const X = data.map(r =>
            features.map(f => {
                const val = r[f];
                return val === undefined ? 0 : val;
            })
        );
        
        const y = data.map(r => {
            const outcome = r.Outcome === undefined ? 0 : r.Outcome;
            return oneHot(outcome);
        });
        
        const splitIdx = parseInt((1 - testSize) * data.length, 10);
        
        const ds = tf.data
            .zip({ xs: tf.data.array(X), ys: tf.data.array(y) })
            .shuffle(data.length, 42);
        
        return [
            ds.take(splitIdx).batch(batchSize),
            ds.skip(splitIdx + 1).batch(batchSize),
            tf.tensor(X.slice(splitIdx)),
            tf.tensor(y.slice(splitIdx))
        ];
    };

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

    start();
        
    return(
        <Fragment>
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="outcome-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="acc-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="scatter-cont"></div>
            </Row>
        </Fragment>
    )
}

export default PredictingDiabetes;
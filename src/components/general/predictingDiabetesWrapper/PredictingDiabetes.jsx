import React, { Fragment, useState, useEffect } from "react";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from '@tensorflow/tfjs';
import { Button, Select, Row, Form, Input, Divider } from 'antd';
import PieChart from "./components/PieChart";
import Histogram from "./components/HistogramCharts";
import * as Plotly from "plotly.js";
import { loadData, renderHistogram, renderScatter } from "./functions";

function PredictingDiabetes(){
    let [ data, setData ] = useState([]);
    let [ model, setModel ] = useState();

    async function start(){
        if(data.length === 0){
            const newData = await loadData();
            console.log(newData)
            setData(data = newData)
        }

        const features = ["Glucose", "Age", "Insulin", "BloodPressure"];

        const [trainDs, validDs, xTest, yTest] = createDataSets(
            data,
            features,
            0.1,
            16
        );
        
        const model = await trainLogisticRegression(
            features.length,
            trainDs,
            validDs
        );

        const preds = model.predict(xTest).argMax(-1);
        const labels = yTest.argMax(-1);

        const confusionMatrix = await tfvis.metrics.confusionMatrix(labels, preds);

        const container = document.getElementById("confusion-matrix");

        tfvis.render.confusionMatrix(container, {
            values: confusionMatrix,
            tickLabels: ["Healthy", "Diabetic"]
        });

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

    const trainLogisticRegression = async (featureCount, trainDs, validDs) => {
        const model = tf.sequential();
        /*model.add(
            tf.layers.dense({
                units: 12,
                activation: "relu",
            })
        );*/
        model.add(
            tf.layers.dense({
                units: 2,
                activation: "softmax",
                inputShape: [featureCount]
            })
        );
        const optimizer = tf.train.adam(0.001);
        
        model.compile({
            optimizer: optimizer,
            loss: "binaryCrossentropy",
            metrics: ["accuracy"]
        });
        const trainLogs = [];
        const lossContainer = document.getElementById("loss-cont");
        const accContainer = document.getElementById("acc-cont");
        
        console.log("Training...");
        
        await model.fitDataset(trainDs, {
            epochs: 70,
            validationData: validDs,
            callbacks: {
                onEpochEnd: async (epoch, logs) => {
                    trainLogs.push(logs);
                    tfvis.show.history(lossContainer, trainLogs, ["loss", "val_loss"]);
                    tfvis.show.history(accContainer, trainLogs, ["acc", "val_acc"]);
                }
            }
        });
      
        return model;
    };

    start();
        
    return(
        <Fragment>
            <PieChart data={data}/>
            <Histogram data={data}/>
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="confusion-matrix"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="loss-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="acc-cont"></div>
            </Row>
        </Fragment>
    )
}

export default PredictingDiabetes;
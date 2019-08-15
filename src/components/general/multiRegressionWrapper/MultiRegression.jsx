import React, { Fragment, useState, useEffect } from "react";
import * as tfvis from "@tensorflow/tfjs-vis";
import * as tf from '@tensorflow/tfjs';
import { Button, Select, Row, Form, Input, Divider } from 'antd';

function MultiRegression(){
    const data = [
         { index: "Jill", value: 10 },
         { index: "Jane", value: 20 },
         { index: "Ivan", value: 30 }
    ];

    const data2 = Array(20).fill(0).map(x => Math.random() * 50);

    const apples = Array(14)
        .fill(0)
        .map(y => Math.random() * 100 + Math.random() * 50)
        .map((y, x) => ({ x: x, y: y }));

    const oranges = Array(14)
        .fill(0)
        .map(y => Math.random() * 100 + Math.random() * 150)
        .map((y, x) => ({ x: x, y: y }));

    const series = ["Apples", "Oranges"];
    const data3 = { values: [apples, oranges], series };

    const kgToLbs = kg => kg * 2.2;
    const xs = tf.tensor(Array.from({ length: 2000 }, (x, i) => i));
    const ys = tf.tensor(Array.from({ length: 2000 }, (x, i) => kgToLbs(i)));

        
    useEffect(() => {
        setTimeout(async() => {
            const container = document.getElementById("barchart-cont");
            tfvis.render.barchart(container, data, {
                xLabel: "Customer",
                yLabel: "Payment",
                height: 350,
                fontSize: 16
            });

            const container2 = document.getElementById("histogram-cont");
                tfvis.render.histogram(container2, data2, {
                maxBins: 5,
                height: 450,
                fontSize: 16
            });

            const container3 = document.getElementById("scatter-cont");
                tfvis.render.scatterplot(container3, data3, {
                xLabel: "day",
                yLabel: "sales",
                height: 450,
                zoomToFit: true,
                fontSize: 16
            });

            const model = tf.sequential();

            model.add(tf.layers.dense({ units: 1, inputShape: 1 }));
            model.compile({
                loss: "meanSquaredError",
                optimizer: "adam"
            });
            
            await model.fit(xs, ys, {
                epochs: 100,
                shuffle: true
            });

            const lbs = model
                .predict(tf.tensor([10]))
                .asScalar()
                .dataSync();

            console.log("10 kg to lbs: " + lbs);

        },100)
    })

    return(
        <Fragment>
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="barchart-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="histogram-cont"></div>
            </Row>
            <Divider />
            <Row style={{marginLeft: 20, marginRight: 40}}>
                <div id="scatter-cont"></div>
            </Row>
        </Fragment>
    )
}

export default MultiRegression;
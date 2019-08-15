import React from "react";
import * as Papa from "papaparse";
import * as Plotly from "plotly.js";

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

export const loadData = async () => {
    const csv = await Papa.parsePromise(
        "https://raw.githubusercontent.com/curiousily/Logistic-Regression-with-TensorFlo\w-js/master/src/data/diabetes.csv"
    );
    return csv.data;
};

export const renderHistogram = (container, data, column, config) => {
    const diabetic = data.filter(r => r.Outcome === 1).map(r => r[column]);
    const healthy = data.filter(r => r.Outcome === 0).map(r => r[column]);
  
    const dTrace = {
        name: "diabetic",
        x: diabetic,
        type: "histogram",
        opacity: 0.6,
        marker: {
            color: "gold"
        }
    };
  
    const hTrace = {
        name: "healthy",
        x: healthy,
        type: "histogram",
        opacity: 0.4,
        marker: {
            color: "forestgreen"
        }
    };
  
    Plotly.newPlot(container, [dTrace, hTrace], {
        barmode: "overlay",
        xaxis: {
            title: config.xLabel
        },
        yaxis: { title: "Count" },
        title: config.title
    });
};

export const renderScatter = (container, data, columns, config) => {
    const diabetic = data.filter(r => r.Outcome === 1);
    const healthy = data.filter(r => r.Outcome === 0);
  
    var dTrace = {
        x: diabetic.map(r => r[columns[0]]),
        y: diabetic.map(r => r[columns[1]]),
        mode: "markers",
        type: "scatter",
        name: "Diabetic",
        opacity: 0.4,
        marker: {
            color: "gold"
        }
    };
  
    var hTrace = {
        x: healthy.map(r => r[columns[0]]),
        y: healthy.map(r => r[columns[1]]),
        mode: "markers",
        type: "scatter",
        name: "Healthy",
        opacity: 0.4,
        marker: {
            color: "forestgreen"
        }
    };
  
    var chartData = [dTrace, hTrace];
  
    Plotly.newPlot(container, chartData, {
        title: config.title,
        xaxis: {
            title: config.xLabel
        },
        yaxis: { title: config.yLabel }
    });
};
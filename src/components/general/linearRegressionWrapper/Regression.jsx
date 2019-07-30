import React, { Fragment, useState } from "react";
import LinearRegressionCalc from "./linear-regression";
import { loadCSV } from './load-csv';
import { Button, Select, Row, Spin, notification } from 'antd';
const { Option } = Select;

const openNotification = (type, title, description, btn, duration) => {
    notification[type]({
        message: title,
        description: description,
        duration: duration,
        btn
    });
};

function Regression({features, labels, testFeatures, testLabels, dataColumns, dataLabels}){
    let [ r2, setR2 ] = useState(0);
    let [ mpg, setMpg ] = useState(0);
    let [ loading, setLoading ] = useState(false);

    const regression = new LinearRegressionCalc(features, labels, {
        learningRate: 0.1, 
        iterations: 10,
        batchSize: 10  
    });

    function predict(){
        let prediction = [];
        
        for (var key in dataLabels) {
            if (dataLabels.hasOwnProperty(key)) {
                prediction.push(parseFloat(dataLabels[key]))
            }
        }
        
        if(dataColumns.length !== prediction.length){
            let title = "Number of labels is not equal to features.";
            let description = 
                <div>
                    To make a prediction the number os labels need to be the same of features.
                </div>;
            openNotification('warning', title, description, "", 0);
        }else{
            setLoading(loading = true);

            regression.train();

            regression.test(testFeatures, testLabels, r2, setR2);

            /*let result = regression.predict([
                [120,2,380]
            ]);*/
            let result = regression.predict([prediction]);
            
            result.data().then((r)=>{
                setMpg(mpg = r[0])
                setLoading(loading = false);
            })
        }
    }

    if(loading) return <Spin style={{display: "block", margin: "auto"}} size="large"/>

    return(
        <Row>
            {
                r2 > 0 ?
                    <div style={{display: "block", margin: "auto", marginTop: 20}}>
                        <h1>R2 is: {r2.toFixed(2)}</h1>
                        <br/>
                        <h1>MPG : {mpg.toFixed(2)}</h1>
                    </div>
                : null
            }
            <Button 
                type="primary" 
                onClick={() => predict()} style={{display: "block", margin: "auto", marginTop: 20}}
            >
                Predict
            </Button>
        </Row>
    )
}

export default Regression;
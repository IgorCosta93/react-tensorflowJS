import React, { Fragment, useState } from "react";
import LinearRegressionCalc from "./linear-regression";
import { loadCSV } from './load-csv';
import { Button, Select, Row, Spin  } from 'antd';
const { Option } = Select;

function Regression({features, labels, testFeatures, testLabels, data}){
    let [ r2, setR2 ] = useState(0);
    let [ mpg, setMpg ] = useState(0);
    let [ loading, setLoading ] = useState(false);

    const regression = new LinearRegressionCalc(features, labels, {
        learningRate: 0.1, 
        iterations: 10,
        batchSize: 10  
    });

    function predict(){
        setLoading(loading = true);

        regression.train();

        regression.test(testFeatures, testLabels, r2, setR2);

        let result = regression.predict([
            [120,2,380]
        ]);
        
        result.data().then((r)=>{
            setMpg(mpg = r[0])
            setLoading(loading = false);
        })
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
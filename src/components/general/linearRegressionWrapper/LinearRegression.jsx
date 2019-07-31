import React, { Fragment, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import CSVReader from "react-csv-reader";
import { loadCSV } from './load-csv';
import _ from 'lodash';
import Regression from "./Regression";
import { Button, Select, Row, Form, Input } from 'antd';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
        lg: { span: 3 },
        xl: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        lg: { span: 14 },
        xl: { span: 14 },
    },
};

function LinearRegression(){
    let [ selectFeatures, setSelectFeatures ] = useState([]);
    let [ data, setData ] = useState([]);
    let [ csvData, setCsvData ] = useState({
        features: [],
        labels: [],
        testFeatures: [],
        testLabels: []
    });
    let [ dataColumns, setDataColumns ] = useState([]);
    let [ dataLabels, setDataLabels ] = useState({});
    let [ learningRate, setLearningRate ] = useState("");
    let [ iterations, setIterations ] = useState("");
    let [ batchSize, setBatchSize ] = useState("");

    function handleForce(data){
        setSelectFeatures(selectFeatures = _.cloneDeep(data[0]));
        setData(data = _.cloneDeep(data))
    };

    function setFeatures(){
        let result = loadCSV(data, {
            shuffle: true,
            splitTest: 50,
            dataColumns: dataColumns,
            labelColumns: ['mpg']
        })

        result.then(r => {
            setCsvData(csvData = {...csvData,
                features: r.features,
                labels: r.labels,
                testFeatures: r.testFeatures,
                testLabels: r.testLabels,
            })
        })
    }

    function handleChange(value) {
        setDataColumns(dataColumns = value)
    }

    function handleLabels(c, value){
        value = value.replace(/[^\d.-]/g, '')
        setDataLabels(dataLabels = {...dataLabels,
            [c]: value
        })
    }

    return (
        <Fragment>            
            <Row>
                <CSVReader
                    cssClass="react-csv-input"
                    label="Select CSV"
                    onFileLoaded={handleForce}
                />

                {
                    selectFeatures.length > 0 ?
                        <Row>
                            <Form className="baseForm" style={{display: "block", margin: "auto", marginBottom: 80}}>
                                <Form.Item 
                                    {...formItemLayout} 
                                    label={"Features"} 
                                    style={{marginTop: 25}}
                                    hasFeedback
                                    required={true}
                                >
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={handleChange}
                                    >
                                        {selectFeatures.map(f => {
                                            return <Option key={f}>{f}</Option>
                                        })}
                                    </Select> 
                                </Form.Item>

                                <Form.Item 
                                    {...formItemLayout} 
                                    label={"Learning Rate"} 
                                    style={{marginTop: 25}}
                                    hasFeedback
                                    required={true}
                                >
                                    <Input 
                                        value={learningRate} 
                                        placeholder={`Type the value for learning rate.`}
                                        onChange={e => setLearningRate(learningRate = e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item 
                                    {...formItemLayout} 
                                    label={"Iterations"} 
                                    style={{marginTop: 25}}
                                    hasFeedback
                                    required={true}
                                >
                                    <Input 
                                        value={iterations} 
                                        placeholder={`Type the value for iterations.`}
                                        onChange={e => setIterations(iterations = e.target.value)}
                                    />
                                </Form.Item>

                                <Form.Item 
                                    {...formItemLayout} 
                                    label={"Batch Size"} 
                                    style={{marginTop: 25}}
                                    hasFeedback
                                    required={true}
                                >
                                    <Input 
                                        value={batchSize} 
                                        placeholder={`Type the value for batch size.`}
                                        onChange={e => setBatchSize(batchSize = e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                            
                            {
                                dataColumns.map(c => {
                                    return(
                                        <Form className="baseForm" key={c}> 
                                            <Form.Item 
                                                {...formItemLayout} 
                                                label={c} 
                                                style={{marginTop: 25}}
                                                hasFeedback
                                                required={true}
                                            >
                                                <Input 
                                                    value={dataLabels[c]} 
                                                    placeholder={`Type the value for ${c}`}
                                                    onChange={e => handleLabels(c, e.target.value)}
                                                />
                                            </Form.Item>
                                        </Form>
                                    )
                                })
                            }

                            <Button 
                                type="primary" 
                                onClick={() => setFeatures()} style={{display: "block", margin: "auto", marginTop: 20}}
                            >
                                Set Features
                            </Button>
                        </Row>
                    : 
                        null
                }
                {
                    csvData.features.length > 0 ?
                        <Regression 
                            features={csvData.features}
                            labels={csvData.labels}
                            testFeatures={csvData.testFeatures}
                            testLabels={csvData.testLabels}
                            dataColumns={dataColumns}
                            dataLabels={dataLabels}
                            learningRate={learningRate}
                            iterations={iterations}
                            batchSize={batchSize}
                        />
                    : 
                        null
                }
            </Row>
        </Fragment>
    )
}

export default LinearRegression;
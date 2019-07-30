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
        sm: { span: 6 },
        lg: { span: 6 },
        xl: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
        lg: { span: 18 },
        xl: { span: 18 },
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

    function handleForce(data){
        setSelectFeatures(selectFeatures = _.cloneDeep(data[0]));
        setData(data = _.cloneDeep(data))
    };

    function setFeatures(){
        let result = loadCSV(data, {
            shuffle: true,
            splitTest: 50,
            //dataColumns: ['horsepower', 'weight', 'displacement'],
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
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={handleChange}
                                style={{display: "block", margin: "auto", marginTop: 40}}
                            >
                                {selectFeatures.map(f => {
                                    return <Option key={f}>{f}</Option>
                                })}
                            </Select>
                            
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
                        />
                    : 
                        null
                }
            </Row>
        </Fragment>
    )
}

export default LinearRegression;
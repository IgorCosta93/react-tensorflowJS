import React, { Fragment, useState, useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Button, Upload, Icon, Modal, Row, Spin, Col, message, notification  } from 'antd';
const { Dragger } = Upload;
const openNotification = (type, title, description, btn, duration) => {
    notification[type]({
        message: title,
        description: description,
        duration: duration,
        btn
    });
};
let net;
let webcamElement;
const classifier = knnClassifier.create();

function ImageClassifier(){
    let [ imageUrl, setImageUrl ] = useState("");
    let [ loading, setLoading ] = useState(false);
    let [ load, setLoad ] = useState(false);

    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
    );

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            getBase64(info.file.originFileObj, imageUrl =>
                setImageUrl(imageUrl = imageUrl)
            );
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };

    function addExample(classId){
        const imgEl = document.getElementById('img');
        if(imgEl === null){
            let title = "Please select an image before traine the model.";
            let description = 
                <div>
                    To train the model you need to load an image.
                </div>;
            openNotification('warning', title, description, "", 0);
        }else{
            console.log(imgEl)
            const activation = net.infer(imgEl, 'conv_preds');
            classifier.addExample(activation, classId);
            setImageUrl(imageUrl = "")
        }
    };

    async function app(){
        console.log('Loading mobilenet..');
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');
        setLoad(load = true)
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    async function predict(){
        if (classifier.getNumClasses() > 0) {
            
            const imgEl = document.getElementById('img');
            if(imgEl === null){
                let title = "Please select an image before make a prediction.";
                let description = 
                    <div>
                        To make a prediction you need to load an image.
                    </div>;
                openNotification('warning', title, description, "", 0);
            }else{
                const activation = net.infer(imgEl, 'conv_preds');
                const result = await classifier.predictClass(activation);
          
                const classes = ['A', 'B', 'C'];
                document.getElementById('console').innerText = `
                  prediction: ${classes[result.classIndex]}\n
                  probability: ${result.confidences[result.classIndex]}
                `; 
            }
        }
    }

    useEffect(() => {
        if(load === false) app();
    })

    return(
        <Fragment>
            
            <Row>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                    </p>
                </Dragger>
            </Row>

            {imageUrl !== "" ? 
                <Row>
                    <img 
                        id="img"
                        src={imageUrl} 
                        alt="avatar" 
                        style={{ width: "'100%'" }} 
                    /> 
                </Row>
            : null}

            <Row>
                <Col span={8}>
                    <Button 
                        type="primary" 
                        onClick={() => addExample(0)} 
                        style={{display: "block", margin: "auto", marginTop: 20}}
                    >
                        Sample A
                    </Button>
                </Col>
                <Col span={8}>
                    <Button 
                        type="primary" 
                        onClick={() => addExample(1)} 
                        style={{display: "block", margin: "auto", marginTop: 20}}
                    >
                        Sample B
                    </Button>
                </Col>
                <Col span={8}>
                    <Button 
                        type="primary" 
                        onClick={() => addExample(2)} 
                        style={{display: "block", margin: "auto", marginTop: 20}}
                    >
                        Sample C
                    </Button>
                </Col>
                <div id="console"></div>
            </Row>
            <Row>
                <Button 
                    type="primary" 
                    onClick={() => predict()} 
                    style={{display: "block", margin: "auto", marginTop: 20}}
                >
                    Predict
                </Button>
            </Row>
        </Fragment>
    )
}

export default ImageClassifier;
import React, { Fragment, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Button, Upload, Icon, Modal, Row, Spin, Col  } from 'antd';
let net;
let webcamElement;
const classifier = knnClassifier.create();

class WebcamClassifier extends React.Component {
    constructor(props) {
        super(props);
        this.videoTag = React.createRef()
    }

    addExample = classId => {
        console.log(webcamElement)
        const activation = net.infer(webcamElement, 'conv_preds');
        const imgEl = document.getElementById('img');
        const activation2 = net.infer(imgEl, 'conv_preds');
        console.log(activation)
        console.log(activation2)
        console.log(classId)
        classifier.addExample(activation, classId);
    };

    async app() {
        console.log('Loading mobilenet..');
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');
        webcamElement = document.getElementById("webcam");

        while (true) {
            if (classifier.getNumClasses() > 0) {
              const activation = net.infer(webcamElement, 'conv_preds');
              const result = await classifier.predictClass(activation);
        
              const classes = ['A', 'B', 'C'];
              document.getElementById('console').innerText = `
                prediction: ${classes[result.classIndex]}\n
                probability: ${result.confidences[result.classIndex]}
              `;
            }
        
            await tf.nextFrame();
        }

    }

    componentDidMount() {
        navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.videoTag.current.srcObject = stream)
            .catch(console.log);
        
        this.app();
    }

    render() {
        return(
            <Fragment>
                <Row>
                    <video 
                        id="webcam"
                        ref={this.videoTag}
                        width="400"
                        height="400"
                        autoPlay
                        title={this.props.title}
                        style={{display: "block", margin: "auto", marginTop: 20}}
                    />
                    <img id="img" crossOrigin="true" src="https://i.imgur.com/JlUvsxa.jpg" width={227} height={227}/>
                    <div id="console"></div>
                </Row>
                <Row>
                    <Col span={8}>
                        <Button 
                            type="primary" 
                            onClick={() => this.addExample(0)} 
                            style={{display: "block", margin: "auto", marginTop: 20}}
                        >
                            Sample A
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button 
                            type="primary" 
                            onClick={() => this.addExample(1)} 
                            style={{display: "block", margin: "auto", marginTop: 20}}
                        >
                            Sample B
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button 
                            type="primary" 
                            onClick={() => this.addExample(2)} 
                            style={{display: "block", margin: "auto", marginTop: 20}}
                        >
                            Sample C
                        </Button>
                    </Col>
                    <div id="console"></div>
                </Row>
            </Fragment>
        )
    }
}

export default WebcamClassifier;
import React, { Fragment, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import DescriptionItem from "../../common/DescriptionItem";
import { Button, Upload, Icon, Modal, Row, Spin  } from 'antd';
let net;
let webcamElement;

class WebcamRecognize extends React.Component {
    constructor(props) {
        super(props);
        this.videoTag = React.createRef()
    }

    async app() {
        webcamElement = document.getElementById("webcam");
        console.log('Loading mobilenet..');
      
        // Load the model.
        net = await mobilenet.load();
        console.log('Sucessfully loaded model');
        
        //await this.setupWebcam();
        while (true) {
          const result = await net.classify(webcamElement);
          document.getElementById('console').innerText = `
            prediction: ${result[0].className}\n
            probability: ${result[0].probability}
          `;
      
          // Give some breathing room by waiting for the next animation frame to
          // fire.
          await tf.nextFrame();
        }
    }

    componentDidMount() {
        // getting access to webcam
       navigator.mediaDevices
            .getUserMedia({video: true})
            .then(stream => this.videoTag.current.srcObject = stream)
            .catch(console.log);
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
                    <div id="console"></div>
                </Row>
                <Row>
                    <Button 
                        type="primary" 
                        onClick={() => this.app()} style={{display: "block", margin: "auto", marginTop: 20}}
                    >
                        Predict
                    </Button>
                </Row>
            </Fragment>
        )
    }
}

export default WebcamRecognize;

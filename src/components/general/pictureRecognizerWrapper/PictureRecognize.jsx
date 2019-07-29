import React, { Fragment, useState } from "react";
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import DescriptionItem from "../../common/DescriptionItem";
import { Button, Upload, Icon, Modal, Row, Spin  } from 'antd';
let net;

function UploadButton(){
    return (
        <Fragment>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </Fragment>
    )
}

function PictureReccognize({}){
    let [ previewVisible, setPreviewVisible ] = useState(false);
    let [ previewImage, setPreviewImage ] = useState("");
    let [ file, setFile ] = useState({});
    let [ image, setImage ] = useState({});
    let [ probabilities, setProbabilities ] = useState([]);
    let [ loading, setLoading ] = useState(false);

    async function app() {
        setLoading(loading = true)
        setProbabilities(probabilities = []);
        let data = [];

        net = await mobilenet.load();
      
        const imgEl = document.getElementById('img2');
        const result = await net.classify(imgEl);
        
        result.map((r, i) => {
            data.push({
                _id: i,
                title: r.className,
                percent: r.probability
            })
        })

        setProbabilities(probabilities = data);
    }

    function getImg(img){
        setImage(
            image = {...image, 
                picture: img.thumbUrl,
            } 
        );
    }
    
    function handleChange(info){
        if(info.fileList.length === 0){
            setFile(file = {});
        }else{
            if(info.file.status !== "uploading"){
                if(info.file.status === "done"){
                    setFile(file = info.file);
                    getImg(file);
                    setPreviewImage(previewImage = file.url || file.thumbUrl);
                }else if(info.file.status === "error"){
                    setFile(file = info.file);
                    getImg(file);
                }
            }
        }
    }

    function handleCancel(){
        setPreviewVisible(previewVisible = false)
    }

    function handlePreview(file){
        setPreviewImage(previewImage = file.url || file.thumbUrl);
        setPreviewVisible(previewVisible = true);
    }

    if(loading && probabilities.length > 0) setLoading(loading = false)

    return(
        <Fragment>            
            <Row>
                <Upload
                    name="file"
                    //action='//jsonplaceholder.typicode.com/posts/'
                    listType="picture-card"
                    onChange={handleChange}
                    onPreview={handlePreview}
                >   
                    { file.status ? null : <UploadButton/> }
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                    <img id="img2" alt="example" style={{ width: '100%' }} src={previewImage} />

                    <Row>
                        <Button 
                            type="primary" 
                            onClick={() => app()} style={{display: "block", margin: "auto", marginTop: 20}}
                        >
                            Predict
                        </Button>
                    </Row>

                    <Row style={{marginTop: 20}}>
                        {
                            loading ? 
                                <Spin style={{display: "block", margin: "auto"}} size="large"/>
                            :
                                probabilities.map(p => {
                                    return(
                                        <DescriptionItem
                                            key={p._id}
                                            title={p.title}
                                            content={`Probability: ${(parseFloat(p.percent)*100).toFixed(2)} %`}
                                        />
                                    )
                                })
                        }
                    </Row>
                </Modal>
            </Row>
        </Fragment>
    )
}

export default PictureReccognize;
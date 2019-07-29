import React, { Fragment } from "react";
import {
    Chart,
    Geom,
    Tooltip,
    Coord,
  } from "bizcharts";
import DataSet from "@antv/data-set";
import CardReport from "../../../common/CardReport";
import { Row, Typography, Icon } from 'antd';
const { Title } = Typography;
const padding = [5, 5, 10, 5];

const data = [
    {
      State: "IATF",
      "Sucesso": 75,
      "Falha": 25
    }
];

const cols = {
    month: {
      range: [0, 1]
    }
};

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: "fold",
    fields: ["Sucesso", "Falha"],
    // 展开字段集
    key: "年龄段",
    // key字段
    value: "人口数量",
    // value字段
    retains: ["State"] // 保留字段集，默认为除fields以外的所有字段
});

function body(){
    return (
        <div style={{marginTop:-20, marginLeft:-5}}>
            <Row style={{ marginTop: "5px" }}>
                <Title level={2}>75%</Title>
            </Row>
            <Chart 
                animate={true}
                height={50} 
                data={dv} 
                scale={cols} 
                forceFit
                padding={padding}
            >
            <Coord transpose />
            <Tooltip
                crosshairs={{
                type: "y"
                }}
            />
                <Geom
                    type="intervalStack"
                    position="State*人口数量"
                    color={"年龄段"}
                />
            </Chart>
        </div>
    )
}

function footer(){
    return(
        <p>12% ano<Icon type="caret-up" style={{ marginLeft: "5px", color: "green"}}/></p>
    )
}

function CardIATF({}){
    return(
        <CardReport
            title={"Taxa de IATF"}
            tooltip={"Taxa de sucesso da IATF na Temporada"}
            body={body()}
            footer={footer()}
        /> 
    )
}

export default CardIATF;

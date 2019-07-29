import React, { Fragment } from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { Row, Col, Typography, Badge } from 'antd';
const { Title } = Typography;

const vendors = ['Guerra', 'Izabela', 'Mathes', 'João', 'Mariana', 'Joaquim', 'Fatima']

const data = [
    {
      name: "London",
      "Jan.": 18.9,
      "Feb.": 28.8,
      "Mar.": 39.3,
      "Apr.": 81.4,
      May: 47,
      "Jun.": 20.3,
      "Jul.": 24,
      "Aug.": 35.6
    },
    {
      name: "Berlin",
      "Jan.": 12.4,
      "Feb.": 23.2,
      "Mar.": 34.5,
      "Apr.": 99.7,
      May: 52.6,
      "Jun.": 35.5,
      "Jul.": 37.4,
      "Aug.": 42.4
    }
];

const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: "fold",
    fields: ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."],
    // 展开字段集
    key: "月份",
    // key字段
    value: "月均降雨量" // value字段
});

function Chart1(){
    return (
        <div>
            <Row>
                <Col span={16}>
                    <h2
                        style={{marginLeft: 14, marginTop: 20, marginBottom: 20}}
                    >
                        Tendencia de Vendas
                    </h2>
                    <Chart height={350} data={dv} forceFit style={{marginLeft: -40}}>
                        <Legend />
                        <Axis name="月份" />
                        <Axis name="月均降雨量" />
                        <Tooltip />
                        <Geom
                            type="intervalStack"
                            position="月份*月均降雨量"
                            color={"name"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Col>
                <Col span={7} style={{marginLeft: 45}}>
                    <Fragment> 
                        <h2
                            style={{marginTop: 20, marginBottom: 30}}
                        >
                            Ranking por Vendedor
                        </h2> 
                        {
                            vendors.map((v,index) => {
                                return(   
                                    <Row key={v} style={{marginBottom: 10}}>
                                        <Col span={4}>
                                            <Badge count={index+1} style={{ backgroundColor: '#314659', color: 'white'}} />
                                        </Col>        
                                        <Col span={10}>
                                            <h1>{v}</h1>
                                        </Col>        
                                        <Col span={10}>
                                            <p>Road No. 0 loja</p>
                                        </Col>        
                                        <Col></Col>        
                                    </Row>  
                                )
                            })
                        }   
                    </Fragment>  
                </Col>
            </Row>    
        </div>
    );
}

export default Chart1;
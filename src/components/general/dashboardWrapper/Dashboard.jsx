import React, { Fragment } from "react";
import BarChart from "./charts/BarChart";
import BarChartHorizontal from "./charts/BarChartHorizontal";
import LineChart from "./charts/LineChart";
import IntervalStackChart from "./charts/IntervalStackChart";
import PetalsChart from "./charts/PetalsChart";
import CardVisits from "./cards/CardVisits";
import CardPayments from "./cards/CardPayments";
import CardIATF from "./cards/CardIATF";
import CardPregnancy from "./cards/CardPregnancy";
import Map from "../../common/Map";
import { Row, Col, Card  } from 'antd';

function Dashboard({ props }){
    return(
       <Fragment>
            <Row>
                <Col span={6} style={{marginRight: 0}}>
                    <CardPregnancy/> 
                </Col>
                <Col span={6} >
                    <CardVisits/> 
                </Col>
                <Col span={6}>
                    <CardPayments/> 
                </Col>
                <Col span={6} >
                    <CardIATF/> 
                </Col>
            </Row>
                
            <Row>
                <Col span={12} style={{marginLeft: 0, marginTop: 30}}>
                    <Card title="Mapa" bordered={false} style={{ width: "97%" }}>
                        <Map/>
                    </Card>
                </Col>
                <Col span={12} style={{marginLeft: 0, marginTop: 30}}>
                    <Card title="Fazendas" bordered={false} style={{ width: "97%" }}>
                        <BarChart/>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={12} style={{marginLeft: 0, marginTop: 30}}>
                    <Card title="Colaboradores" bordered={false} style={{ width: "97%" }}>
                        <BarChartHorizontal/>
                    </Card>
                </Col>
                <Col span={12} style={{marginLeft: 0, marginTop: 30}}>
                    <Card title="Touros" bordered={false} style={{ width: "97%" }}>
                        <IntervalStackChart/>
                    </Card>
                </Col>
            </Row>
            
            <Row>
                <Col span={12} style={{marginLeft: 0, marginTop: 0}}>
                    <Card title="Categoria" bordered={false} style={{ width: "97%" }}>
                        <PetalsChart/>
                    </Card>
                </Col>
                <Col span={12} style={{marginLeft: 0, marginTop: 0}}>
                    <Card title="Categoria" bordered={false} style={{ width: "97%" }}>
                        <LineChart/>
                    </Card>
                </Col>
            </Row>
 
       </Fragment>
    )
}

export default Dashboard;
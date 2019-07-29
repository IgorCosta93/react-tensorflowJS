import React, { Fragment } from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import CardReport from "../../../common/CardReport";
import DataSet from "@antv/data-set";
import { Row, Icon, Typography } from 'antd';
const { Title } = Typography;
const padding = [5, 5, 10, 5];

const data = [
    {
      month: "Jan",
      Tokyo: 2.75,
    },
    {
      month: "Feb",
      Tokyo: 3,
    },
    {
      month: "Mar",
      Tokyo: 2.75,
    },
    {
      month: "Apr",
      Tokyo: 2.50,
    },
    {
      month: "May",
      Tokyo: 2.50,
    },
    {
      month: "Jun",
      Tokyo: 2.75,
    },
    {
      month: "Jul",
      Tokyo: 3,
    },
    {
      month: "Aug",
      Tokyo: 3.25,
    },
    {
      month: "Sep",
      Tokyo: 3.50,
    },
    {
      month: "Oct",
      Tokyo: 3.75,
    },
    {
      month: "Nov",
      Tokyo: 3.50,
    },
    {
      month: "Dec",
      Tokyo: 3,
    }
];
const ds = new DataSet();
const dv = ds.createView().source(data);
dv.transform({
    type: "fold",
    fields: ["Tokyo", "London"],
    // 展开字段集
    key: "city",
    // key字段
    value: "temperature" // value字段
});

const cols = {
    month: {
      range: [0, 1]
    }
};

function cardVisits(){
    return (
        <div style={{marginTop:-20, marginLeft: -5}}>
            <Row style={{ marginTop: "5px" }}>
                <Title level={2}>3.25</Title>
            </Row>
            <Chart 
                animate={true}
                height={50} 
                data={dv} 
                scale={cols} 
                forceFit
                padding={padding}
            >
            <Axis 
                name="month" 
                label={false}
                line={false}
                tickLine={false}
                grid={false}
            />
            <Axis
                name="temperature"
                label={false}
                line={false}
                tickLine={false}
                grid={false}
            />
            <Tooltip
                crosshairs={{
                type: "y"
                }}
            />
            <Geom
                type="area"
                position="month*temperature"
                //size={2}
                color={"city"}
                shape={"smooth"}
            />
            </Chart>
        </div>
    )
}

function cardVisitsFooter(){
    return(
        <p>Melhor mês 3.5</p>
    )
}

function CardVisits({}){
    return(
        <CardReport
            title={"ECC Médio"}
            tooltip={"ECC médio ao longo do ano"}
            body={cardVisits()}
            footer={cardVisitsFooter()}
        /> 
    )
}

export default CardVisits;
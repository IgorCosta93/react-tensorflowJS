import React, { Fragment } from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import CardReport from "../../../common/CardReport";
import DataSet from "@antv/data-set";
import { Row, Typography, Icon } from 'antd';
const { Title } = Typography;
const padding = [5, 5, 10, 5];

const data = [
    {
      month: "Janeiro",
      Tokyo: 425,
    },
    {
      month: "Fevereiro",
      Tokyo: 406,
    },
    {
      month: "Março",
      Tokyo: 389,
    },
    {
      month: "Abril",
      Tokyo: 542,
    },
    {
      month: "Maio",
      Tokyo: 478,
    },
    {
      month: "Junho",
      Tokyo: 300,
    },
    {
      month: "Julho",
      Tokyo: 350,
    },
    {
      month: "Agosto",
      Tokyo: 398,
    },
    {
      month: "Setembro",
      Tokyo: 450,
    },
    {
      month: "Outubro",
      Tokyo: 470,
    },
    {
      month: "Novembro",
      Tokyo: 420,
    },
    {
      month: "Dezembro",
      Tokyo: 400,
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
    value: "Animais" // value字段
});

const cols = {
    month: {
      range: [0, 1]
    }
};

function body(){
    return (
        <div style={{marginTop:-20}}>
            <Row style={{ marginTop: "5px" }}>
                <Title level={2}>81,72%</Title>
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
                name="Animais"
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
                type="interval"
                position="month*Animais"
                //size={2}
                color={"#9760E3"}
                adjust={[
                    {
                        type: "dodge",
                        marginRatio: 1 / 32
                    }
                ]}
            />
            </Chart>
      </div>
    )
}

function footer(){
    return(
        <p>5,4% ano<Icon type="caret-up" style={{ marginLeft: "5px", color: "green"}}/></p>
    )
}

function CardPregnancy({}){
    return(
        <CardReport
            title={"Prenhez Final"}
            tooltip={"Porcentagem de Vacas Prenhaz ao Final da Estação"}
            body={body()}
            footer={footer()}
        /> 
    )
}

export default CardPregnancy;

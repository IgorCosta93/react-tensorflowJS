import React, { Fragment } from "react";
import BarChartTab from "./BarChartTab";
import { Row, Col  } from 'antd';

function Report({}){
    return(
        <Fragment>
            <Row>
                <Col span={23} style={{marginLeft: 20, marginRight: 20, marginTop: 20}}>
                    <BarChartTab/>
                </Col>
            </Row>

        </Fragment>
    )
}

export default Report;
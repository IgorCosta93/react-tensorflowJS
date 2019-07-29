import React from "react";
import { Card, Row, Col, Tooltip, Icon, Divider  } from 'antd';

function CardReport({ title, tooltip, body, footer }){
    return(
        <Card
            style={{ width: "95%" }}
        >
            <Row>
                <Col span={22}>
                    {title}
                </Col>
                <Col span={2}>
                    <Tooltip title={tooltip}>
                        <Icon type="question-circle-o" />
                    </Tooltip>
                </Col>
            </Row>
            {body}
            <Divider style={{marginTop: "-3px"}}/>

            <Row style={{ marginTop: "-10px", marginBottom: "-20px" }}>
                {footer}
            </Row>
        </Card>
    )
}

export default CardReport;
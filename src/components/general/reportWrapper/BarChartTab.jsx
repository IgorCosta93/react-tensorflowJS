import React from "react";
import Chart1 from "./charts/Chart1";
import { Tabs, Icon  } from 'antd';
const TabPane = Tabs.TabPane;

function BarChartTab(){
    return(
        <Tabs defaultActiveKey="1">
            <TabPane tab={<span><Icon type="apple" />Tab 1</span>} key="1">
                <Chart1/>
            </TabPane>
            <TabPane tab={<span><Icon type="android" />Tab 2</span>} key="2">
                Tab 2
            </TabPane>
        </Tabs>
    )
}

export default BarChartTab;
import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'

import { Card } from 'antd';


@inject("coins")
@observer
class EtfValue extends Component {

    render() {
        const etfValue = this.props.coins.etfValue;
        const etfValueUSD = this.props.coins.etfValueUSD;
        const etfValueCNY = this.props.coins.etfValueCNY;

        return (
            <Card title={<h1 style={{background: "#FFF", color: "#001529"}}>ETF Value</h1>} >
                <Card
                    type="inner"
                    title="Bitcoin Price"
                >
                    {etfValue}
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="USD Price"
                >
                    {etfValueUSD}
                </Card>
                <Card
                    style={{ marginTop: 16 }}
                    type="inner"
                    title="CNY Price"
                >
                    {etfValueCNY}
                </Card>
            </Card>
        );
    }
}

export default EtfValue;

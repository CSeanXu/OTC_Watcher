import React, {Component} from 'react';
import { Transfer, InputNumber, Spin, Slider, Row, Col } from 'antd';
import {inject, observer} from 'mobx-react'


@inject("coins")
@observer
class TransferCoins extends Component {

    handleChange = (targetKeys, direction, moveKeys) => {
        const modified = targetKeys;
        const pairsId = this.props.pairsId;
        const record = this.props.coins.filterExisted(pairsId);
        record.coins = modified;
    };

    renderItem = (item) => {
        const customLabel = (
            <span className="custom-item">
                {item.symbol} - {item.name}
            </span>
        );

        return {
            label: customLabel, // for displayed item
            value: item.symbol, // for title and filter matching
        };
    };

    filterOption = (inputValue, option) => {
        return option.symbol.indexOf(inputValue) > -1 || option.name.indexOf(inputValue) > -1;
    };

    onPercentChange = (value) => {
        const pairsId = this.props.pairsId;
        this.props.coins.updatePercentage(pairsId, value);
    };

    render() {
        const all = this.props.coins.all;
        const isLoading = this.props.coins.isLoading;
        const pairsId = this.props.pairsId;
        const record = this.props.coins.filterExisted(pairsId);

        const percent = record.percentage;
        let dataSource = [];

        all.forEach((record) => {
            record.key = record.id;
            dataSource.push(record);
        });
        const targetKeys = record.coins.slice();

        return (
            <div>
                <Spin spinning={isLoading}>
                    <Row>
                        <Col span={10}>
                            <Slider value={percent} onChange={this.onPercentChange}/>
                        </Col>
                        <Col span={6}>
                            <InputNumber value={percent} onChange={this.onPercentChange}/>
                        </Col>
                    </Row>

                    <Transfer
                        showSearch
                        dataSource={dataSource}
                        listStyle={{
                            width: 300,
                            height: 300,
                        }}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={this.renderItem}
                        filterOption={this.filterOption}
                    />
                </Spin>
            </div>
        );
    }
}

export default TransferCoins;

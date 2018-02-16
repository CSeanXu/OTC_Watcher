import React, {Component} from 'react';

import TransferCoins from '../components/TransferCoins';
import EtfValue from '../components/EtfValue';

import {Button, Tabs, Slider, Layout, notification, message, Row, Col, Spin, Divider} from 'antd';

import {inject, observer} from "mobx-react/index";
import EtfHistoryChart from "../components/EtfHistoryChart";

const { Header, Content, Footer } = Layout;

const TabPane = Tabs.TabPane;

function formatter(value) {
    return `${value}%`;
}

@inject("coins")
@observer
class Index extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
    }

    componentWillMount(){
        this.props.coins.initExisted()
            .then((initStatus) => {
                initStatus ? notification.success({message: "Existed Init Success."}) : notification.warn({message: "Existed Init Failed."})
            });
    }

    onChange = (activeKey) => {
        this.props.coins.setActiveKey(activeKey);
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const existed = this.props.coins.existed;
        let percentSum = 0;
        const newPercentage = this.props.coins.newPercentage;
        for (let i=0; i<existed.length; i++){
            percentSum += existed[i].percentage;
        }
        if (percentSum + newPercentage > 100){
            notification.error({message: "Total Percent More Than 100%."});
            return
        }
        const activeKey = `newTab${this.newTabIndex++}-${newPercentage}`;
        existed.push({ percentage: newPercentage, key: activeKey, coins: [], _id: activeKey });
        this.props.coins.setActiveKey(activeKey);
    };

    remove = (targetKey) => {
        const existed = this.props.coins.existed.slice().filter(record => record.key !== targetKey);
        console.log(existed);
        this.props.coins.deletePercentage(targetKey)
            .then(
                (deleteStatus) => {
                    if (deleteStatus){
                        this.props.coins.initExisted()
                            .then(initStatus => {
                                initStatus ? message.success("Delete Succeed.") : message.error("Delete Failed.")
                            })
                    }else {
                        message.error("Delete Failed.")
                    }
                }

            )
    };

    onChangePercentage = (value) => {
        this.props.coins.setNewPercentage(value);
    };

    onSubmit = () => {
        this.props.coins.syncAll()
            .then((result) => {
                result ? message.success("Update Succeed.") : message.error("Update Failed.")
            });
    };

    render() {
        const loading = this.props.coins.isLoadingExisted && this.props.coins.isLoading;
        const existed = this.props.coins.existed;
        const activeKey = this.props.coins.activeKey;
        let panes = [];
        existed.forEach((record) => {
            if (!record.key){
                record.key = record._id;
            }
            panes.push(record);
        });

        return (
            <div className="App">
                <Header style={{textAlign: "center", color: "#FFF"}}>
                    ETF
                </Header>
                <Content style={{maxWidth: "80%", margin: "0 auto"}}>
                    <Spin spinning={loading}>
                        <Row gutter={8}>
                            <Col span={12}>
                                <Slider tipFormatter={formatter} onChange={this.onChangePercentage} />
                                <div style={{ marginBottom: 16 }}>
                                    <Button onClick={this.add}>ADD Percentage</Button>
                                </div>
                            </Col>
                        </Row>
                        <Divider/>
                        <Row gutter={8}>
                            <Col span={18}>
                                <Tabs
                                    hideAdd
                                    onChange={this.onChange}
                                    activeKey={activeKey}
                                    onEdit={this.onEdit}
                                    type="editable-card"
                                >
                                    {
                                        panes.map(pane =>
                                            <TabPane tab={`${pane.percentage}%`} key={pane.key}>
                                                <TransferCoins pairsId={pane._id} />
                                            </TabPane>)
                                    }
                                </Tabs>
                            </Col>
                            <Col span={6}>
                                <EtfValue/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{ margin: 16 }}>
                                    <Button type="primary" onClick={this.onSubmit}>Submit</Button>
                                </div>
                            </Col>
                        </Row>
                        <Divider>ETF Chart</Divider>
                        <Row>
                            <Col>
                                <EtfHistoryChart/>
                            </Col>
                        </Row>
                    </Spin>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    SeanXu@chaobi.la
                </Footer>
            </div>
        );
    }
}

export default Index;

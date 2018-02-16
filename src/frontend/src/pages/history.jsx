import React, {Component} from 'react';

import TransferCoins from '../components/TransferCoins';

import {Button, Tabs, Slider, Layout} from 'antd';

const { Header, Content, Footer } = Layout;

const TabPane = Tabs.TabPane;

function formatter(value) {
    return `${value}%`;
}

class Index extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            {title: '40%', content: 'Content of Tab Pane 1', key: '1'},
            {title: '20%', content: 'Content of Tab Pane 2', key: '2'},
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    };
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    };

    render() {
        return (
            <div className="App">
                <Header style={{textAlign: "center", color: "#FFF"}}>
                    ETF
                </Header>
                <Content>
                    <Slider tipFormatter={formatter} />
                    <div style={{ marginBottom: 16 }}>
                        <Button onClick={this.add}>ADD Percentage</Button>
                    </div>
                    <Tabs
                        hideAdd
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}><TransferCoins title={pane.title}/></TabPane>)}
                    </Tabs>
                    <Button type="primary">BTN</Button>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    SeanXu@chaobi.la
                </Footer>
            </div>
        );
    }
}

export default Index;

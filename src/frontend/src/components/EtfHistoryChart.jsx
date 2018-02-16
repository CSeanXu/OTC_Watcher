import React, {Component} from 'react';
import {inject, observer} from 'mobx-react'
import echarts from 'echarts';

import {notification} from 'antd';


@inject("coins")
@observer
class EtfHistoryChart extends Component{
    componentWillMount(){
        this.props.coins.initEtfHistory()
            .then((initResult) => {
                initResult ? notification.success({message: "ETF History Load Succeed."}) : notification.error({message: "ETF History Load Failed."})
                const etfHistory = this.props.coins.etfValueHistory;

                let fakeX = [];
                let fakeYBTC = [];
                let fakeYUSD = [];
                let fakeYCNY = [];

                etfHistory.forEach((record) => {
                    let t = this.formatTS(record.time);
                    console.log(t);
                });

                etfHistory.forEach((record) => {
                    let t = this.formatTS(record.time);
                    console.log(t);
                    fakeX.push(t);
                    fakeYBTC.push(record.value.btc);
                    fakeYUSD.push(record.value.usd);
                    fakeYCNY.push(record.value.cny)
                });

                let optionBTC = {

                    tooltip : {
                        trigger: 'axis'
                    },

                    backgroundColor: '#fff',

                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '4%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        data: fakeX
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: fakeYBTC,
                        type: 'line'
                    }]
                };

                let optionUSD = {

                    tooltip : {
                        trigger: 'axis'
                    },

                    backgroundColor: '#fff',

                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '4%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        data: fakeX
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: fakeYUSD,
                        type: 'line'
                    }]
                };

                let optionCNY = {

                    tooltip : {
                        trigger: 'axis'
                    },

                    backgroundColor: '#fff',

                    grid: {
                        left: '3%',
                        right: '4%',
                        top: '4%',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        data: fakeX
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: fakeYUSD,
                        type: 'line'
                    }]
                };

                let btcChart=echarts.init(document.getElementById('demo'));
                let usdChart=echarts.init(document.getElementById('demo1'));
                let cnyChart=echarts.init(document.getElementById('demo2'));

                btcChart.setOption(optionBTC);
                usdChart.setOption(optionUSD);
                cnyChart.setOption(optionCNY);
            });
    }

    formatTS = (t) => {
        let dt = new Date(parseInt(t, 10) * 1000);
        return dt.toLocaleString();
    };

    render (){
        return(
            <div>
                <div id="demo" style={{'height':'550px'}}></div>
                <div id="demo1" style={{'height':'550px'}}></div>
                <div id="demo2" style={{'height':'550px'}}></div>
            </div>
        )
    }
}

export default EtfHistoryChart;

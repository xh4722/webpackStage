/* 数据同步模块 */
const Mock = require('mockjs');

let template = {
    result: 100
};

template.data = {
    aliIncome: 137050,
    aliPayment: 128050,
    aliRechargePayment: 1000,
    aliRefundFee: 0,
    cashIncome: 45190,
    cashPayment: 10000,
    cashRechargePayment: 0,
    cashRefundFee: 0,
    companyId: 1,
    created: '2018-03-27 19:47:23',
    damageNum: 0,
    deviceId: 'unknown',
    endTime: '2018-03-28 14:50:58',
    id: 7371,
    isChecked: false,
    isNormal: 0,
    mCardPayment: 3000,
    mCardRefundFee: 0,
    modified: '2018-03-27 19:47:23',
    normal: false,
    otherPayment: 15640,
    pointDeductAmount: 0,
    rechargeNum: 2,
    rechargePresentFee: 0,
    refundNum: 0,
    shopId: 28,
    shopUserId: 618,
    shopUserName: '001',
    startCash: 0,
    startTime: '2018-03-27 19:47:22',
    totalIncome: 227130,
    totalPayment: 168490,
    totalRechargePayment: 3000,
    totalRefundFee: 0,
    tradeNum: 15,
    unionPayIncome: 39090,
    unionPayRechargePayment: 0,
    unionPayRefundFee: 0,
    wxIncome: 2000,
    wxPayment: 0,
    wxRechargePayment: 2000,
    wxRefundFee: 0
};

let count = 10;
template.data[`customInfo|0-${count}`] = [{
    'payType|+1': 20,
    'customIncome|1000-10000000': 1000,
    'customPayment|1000-10000000': 1000,
    'customRefundFee|1000-10000000': 1000,
    'customRechargePayment|1000-10000000': 1000
}];

// 生成同步数据
const handoverData = Mock.mock(template);
handoverData.data.customInfo = JSON.stringify(handoverData.data.customInfo);

module.exports = {
    data: handoverData
}

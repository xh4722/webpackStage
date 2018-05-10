/* 优惠券模块 */
const Mock = require('mockjs');

let couponsTemplate = {
    data: {
        code: 1
    },
    result: 100
};
// 配置优惠券数量
let count = 2;
couponsTemplate.data[`coupons|0-${count}`] = [{
    'canUse|1': true,
    'isPrint': true,
    'companyId': 1,
    'couponNumber': '@id',
    'created': '@date',
    'customerId': '@id',
    'detail': '',
    'detailObj': {
        'cashAmount|1000-1000000': 1000,
        'cutAmount|1000-1000000': 1000,
        'fullAmount|1000-1000000': 1000,
        'code|0-5': 0,
        'specifiedItemIds|1-1': ['@word(3, 30)']
    },
    'endTime': '@date',
    'errorStatus|0-5': 0,
    'id': '@id',
    'isTtgy|1': 0,
    'modified': '@date',
    'msg': '@word(5, 15)',
    'promotionId': '@id',
    'remark': '@word(5, 15)',
    'shopId': '@id',
    'shopName': '@word(5, 15)',
    'startTime': '@date',
    'status|0-3': 0,
    'tid': '@id',
    'type|0-1': 0,
    'useTime': '@date'
}];

// 生成优惠券数据
const coupons = Mock.mock(couponsTemplate);

module.exports = {
    data: coupons
}

/* 数据同步模块 */
const Mock = require('mockjs');

let syncTemplate = {
    result: 100
};

// 配置自定义支付数量
let customPayCount = 10;
syncTemplate.data = {
    shop: {
        address: '前门大街2',
        city: '北京',
        cityCode: 110100,
        companyId: 1,
        contactName: '2小小-test',
        country: '中国',
        county: '东城区',
        countyCode: 110101,
        created: '2017-05-04 21:45:18',
        enabledStatus: 1,
        id: 28,
        mobile: '18314567891',
        modified: '2018-03-23 16:13:43',
        name: '测试环境小小店',
        outId: '',
        password: '2d5a5df5a9a440762d95c07e8ada2750',
        permissionId: '7',
        province: '北京',
        provinceCode: 110000,
        shopAbbreviation: 'xx',
        shopType: 1,
        username: '12345678'
    },
    sysSetting: {
        autoPrint: true,
        checkMoney: 0,
        companyId: 1,
        companySerialNo: '000001',
        couponDiscount: '[{"discount":85},{"discount":30},{"discount":80}]',
        couponSwitch: 0,
        created: '2017-11-02 19:06:21',
        displaySpec: 0,
        enabledStatus: 1,
        handedMoneySwitch: 1,
        id: 74,
        imprest: 1000000,
        itemViewStyle: 2,
        modified: '2018-03-29 10:06:21',
        notifyCheckMoneyDiff: 1,
        onDutyCheckMoney: 1,
        openRefundVerifySwitch: true,
        picUrl: 'http://fxiao.img-cn-shanghai.aliyuncs.com/kmsypic/null/20180225/1519553394629.jpg',
        refundVerifySwitch: 1,
        roundingRuleDetail: '{"ruleValue":1,"subRule":{"ruleValue":2,"subRule":{"ruleValue":[1],"ruleDesc":"现金抹分"},"ruleDesc":"按支付方式抹分"},"customPay":true,"ruleDesc":"四舍五入抹分"}',
        shopId: 28,
        sysAutoMaling: 0,
        text: '联系电话：0588--88888888，这是直营店',
        total: 1
    }
}

syncTemplate.data.sysSetting[`customPayType|0-${customPayCount}`] = [{
    'id|+1': 20,
    'name': '@word(1, 5)',
    'switch|1': true,
    'initSwitch': true
}];

// 生成同步数据
const sync = Mock.mock(syncTemplate);
sync.data.sysSetting.customPayType = JSON.stringify(sync.data.sysSetting.customPayType);

module.exports = {
    data: sync
}

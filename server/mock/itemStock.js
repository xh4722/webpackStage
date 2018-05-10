/* 商品模块 */
const Mock = require('mockjs');

/***************************************** 商品分类模板 *****************************************/
let itemcatTemplate = {
    result: 100
};
// 配置分类数据
const itemcatCount = 1;
itemcatTemplate[`data|0-${itemcatCount}`] = [{
    'companyId': 1,
    'id|+1': 1,
    'name': '@word(3, 30)',
    'parentId': 0,
    'shopId': 28
}];
// 分类列表
const itemcatList = Mock.mock(itemcatTemplate);

/***************************************** 商品模板 *****************************************/
let itemTemplate = {
    result: 100
};
// 配置商品数据
const itemCount = 1000;
const units  = ['桶', '个', '斤', 'kg', 'g', '升', '份', '箱', '捆',
    '卷', '层', '盒', '件', '筐', '包', '只', '袋', '罐', '瓶', '台', '张'];
itemTemplate[`data|0-${itemCount}`] = [{
    'companyId': 1,
    'barcode': /\d[13]/,
    'chargeUnit': `@pick(${units})`,
    'costPrice|1000-1000000': 0,
    'discountPrice|1000-1000000': 0,
    'hasVip|1': false,
    'id': '@id',
    'itemcatId': `@integer(0, ${itemcatCount})`,
    'itemcatName': '',
    'listingStatus': 1,
    'name': '@word(3, 30)',
    'numiid': '@id',
    'picUrl': 'http://shouyin.kuaimai.com/resources/images/up_img_bak.jpg?x-oss-process=image/resize,w_200,h_200/quality,Q_100',
    'pinyinCode': '',
    'price|1000-1000000': 0,
    'quantity|0-1000': 0,
    'shopId': 28,
    'shortId': /\d[5]/,
    'sytemItemId': '@id',
    'vipPrice|1000-1000000': 0
}];
// 商品列表
const itemList = Mock.mock(itemTemplate);
// 为商品添加分类名称
itemList.data = itemList.data.map((item) => {
    let itemcat = itemcatList.data.find((itemcat) => {
        return itemcat.id == item.itemcatId;
    });

    if(itemcat) {
        item.itemcatName = itemcat.name;
    } else {
        item.itemcatName = '默认分类';
    }
    return item;
});

module.exports = {
    itemcats: {
        data: itemcatList
    },
    items: {
        data: itemList
    }
};

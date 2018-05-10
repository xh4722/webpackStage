/**
* mock 数据测试文件
**/
try {
    console.log('测试商品库 mock 数据');
    let itemStock = require('./itemStock');
    console.log(`
        商品库数据生成成功
            商品数：${itemStock.items.data.data.length}
            分类数：${itemStock.itemcats.data.data.length}
    `);

    console.log(`测试优惠券 mock 数据`);
    let coupons = require('./coupons');
    console.log(`
    优惠券数据生成成功
        优惠券数量：${coupons.data.data.length}
`);
} catch(err) {
    console.error(err);
}

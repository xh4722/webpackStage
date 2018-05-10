/**
* 切换代理地址后，无需重启服务器，但需要重新登录
**/
module.exports = {
    /* 根路径匹配 */
    '/': {
        /* 收银端测试环境 */
        target: 'syclient.kuaimai.com',
        /* 收银端正式环境 */
        //target: 'syclient.kuaimai.com',
        /* 小马 */
        //target: '192.168.59.216:8181',
        /* 周凯 */
        //target: '192.168.59.159:8181'
        /* 周卡俊 */
        //target: 'http://192.168.63.53:8181/'
        /* 何川 */
        //target: '192.168.59.218:8081',
        /* 邱毅平 */
        //target: '192.168.63.34:8181'
    },
    /* 登录接口 */
    '/security/shopuser/login': {
        //delay: 5000
    }
};

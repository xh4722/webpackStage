let debug = require('debug')('app:indexedDB');

/**
* 数据类型判断函数
* @method checkType
* @param {*} variable
* @return {String}
**/
export const checkType = (variable) => {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
}

/**
* indexedDB 数据库对象
* @class Database
**/
class Database {
    constructor() {
        this.db = null;
    }

    /**
    * 数据库删除函数
    * @method deleteDatabase
    * @param {String} name
    **/
    deleteDatabase(name) {
        return new Promise((resolve, reject) => {
            if(!window.indexedDB) {
                reject({
                    message: '当前浏览器不支持 indexedDB'
                });
            } else {
                /* 删除数据库 */
                // 删除数据库请求
                let request = window.indexedDB.deleteDatabase(name);

                // 删除数据库成功
                request.onsuccess = (event) => {
                    resolve({
                        message: '数据库删除成功...',
                        event: event,
                        code: 1
                    });
                };

                // 数据库删除失败
                request.onerror = (event) => {
                    reject({
                        message: '数据库删除失败...',
                        event: event,
                        code: -1
                    });
                };
            }
        });
    }

    /**
    * 数据库开启函数
    * @method open
    * @param {String} name
    * @param {Integer} version
    * @return {Promise}
    **/
    open(name, version) {
        return new Promise((resolve, reject) => {
            if(!window.indexedDB) {
                reject({
                    message: '当前浏览器不支持 indexedDB'
                });
            } else {
                /* 打开数据库 */
                // 打开数据库请求
                let request = window.indexedDB.open(name, version);

                // 数据库打开失败
                request.onerror = (event) => {
                    reject({
                        message:'数据库打开失败...',
                        event: event,
                        data: request.result,
                        code: -1
                    });
                };

                // 数据库阻塞（当前存在其他页面使用该数据库）
                request.onblocked = (event) => {
                    reject({
                        message:'数据库阻塞，请先关闭其他使用该数据库的页面...',
                        event: event,
                        code: -2
                    });
                };

                // 数据库打开成功
                request.onsuccess = (event) => {
                    this.db = request.result;

                    // 数据库错误统一处理
                    this.db.onerror = (event) => {
                        debug('数据库异常: ', event);
                    }
                    // 数据库版本更新检测
                    this.db.onversionchange = () => {
                        this.db.close();
                        debug('检测到数据版本更新，请重新加载界面...');
                    };
                    // 数据库关闭检测
                    this.db.onclose = () => {
                        debug('数据库关闭...');
                    };

                    resolve({
                        type: 'onsuccess',
                        event: event,
                        code: 1
                    });
                };

                // 数据库更新成功
                request.onupgradeneeded = (event) => {
                    this.db = request.result;

                    resolve({
                        type: 'onupgradeneeded',
                        event: event,
                        code: 2
                    });
                };
            }
        });
    }

    /**
    * 向指定存储空间添加数据
    * @method add
    * @param {String} name
    * @param {*} data
    * @return {Promise}
    **/
    add(name, data) {
        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name, 'readwrite');

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'add: 事务处理成功'
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'add: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);
            // 添加一条数据
            if(checkType(data) == 'object') {
                let request = objectStore.add(data);
                request.onsuccess = () => {};
            }// 添加一组数据
            else if(checkType(data) == 'array') {
                for(let i in data) {
                    let request = objectStore.add(data[i]);
                    request.onsuccess = () => {};
                }
            }
        });
    }

    /**
    * 修改指定存储空间的数据
    * @method put
    * @param {String} name
    * @param {*} data
    * @return {Promise}
    **/
    put(name, data) {
        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name, 'readwrite');

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'add: 事务处理成功'
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'add: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);
            // 添加一条数据
            if(checkType(data) == 'object') {
                let request = objectStore.put(data);
                request.onsuccess = () => {};
            }// 添加一组数据
            else if(checkType(data) == 'array') {
                for(let i in data) {
                    let request = objectStore.put(data[i]);
                    request.onsuccess = () => {};
                }
            }
        });
    }

    /**
    * 向指定存储空间删除数据
    * @method delete
    * @param {String} name
    * @param {*} data
    * @return {Promise}
    **/
    delete(name, data) {
        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name, 'readwrite');

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'delete: 事务处理成功'
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'delete: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);

            // 删除一条数据
            if(checkType(data) == 'string' || checkType(data) == 'number') {
                let request = objectStore.delete(data);
                request.onsuccess = () => {};
            }// 删除一组数据
            else if(checkType(data) == 'array') {
                for(let i in data) {
                    let request = objectStore.delete(data[i]);
                    request.onsuccess = () => {};
                }
            }// key range
            else if(data instanceof IDBKeyRange) {
                let request = objectStore.delete(data);
                request.onsuccess = () => {};
            }
        });
    }

    /**
    * 根据键值从数据库获取数据
    * @method get
    * @param {String} name
    * @param {*} data
    * @return {Promise}
    **/
    get(name, data) {
        // 请求结果
        let res = [];

        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name);

            // 事务处理成功
            transaction.oncomplete = () => {
                /* 单个请求不返回数组格式 */
                if(checkType(data) == 'string') {
                    res = (res.length == 1 ? res[0] : null);
                }

                resolve({
                    message: 'get: 事务处理成功',
                    data: res
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'get: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);

            // 获取一条数据
            if(checkType(data) == 'string' || checkType(data) == 'number') {
                let request = objectStore.get(data);
                request.onsuccess = () => {
                    res.push(request.result);
                };
            }// 获取一组数据
            else if(checkType(data) == 'array') {
                objectStore.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result;
                    if(cursor) {
                        if(data.indexOf(cursor.key) >= 0) {
                            /* 搜索数组瘦身 */
                            data = data.filter((item) => {
                                return item != cursor.key;
                            });
                            res.push(cursor.value);
                        }
                        cursor.continue();
                    }
                }
            }// key range
            else if(data instanceof IDBKeyRange) {
                let request = objectStore.get(data);
                request.onsuccess = () => {
                    res.push(request.result);
                };
            }
        });
    }

    /**
    * 根据索引从数据库获取数据
    * @method getByIndex
    * @param {String} name
    * @param {String} indexName
    * @param {*} data
    * @return {Promise}
    **/
    getByIndex(name, indexName, data) {
        let res = [];

        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name);

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'getByIndex: 事务处理成功',
                    data: res
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'getByIndex: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);
            let index = objectStore.index(indexName);

            // 获取一条数据
            if(checkType(data) == 'string' || checkType(data) == 'number') {
                index.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result;

                    if(cursor) {
                        if(cursor.key == data) {
                            res.push(cursor.value);
                        }
                        cursor.continue();
                    }
                };
            }// 获取一组数据
            else if(checkType(data) == 'array') {
                index.openCursor().onsuccess = (event) => {
                    let cursor = event.target.result;

                    if(cursor) {
                        if(data.indexOf(cursor.key) >= 0) {
                            res.push(cursor.value);
                        }
                        cursor.continue();
                    }
                };
            }
        });
    }

    /**
    * 从数据库获取指定数量的数据（size 为空，则获取所有数据）
    * @method get
    * @param {String} name
    * @param {Integer} size
    * @return {Promise}
    **/
    getBySize(name, size) {
        // 请求结果
        let res = [];

        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name);

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'getBySize: 事务处理成功',
                    data: res
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'getBySize: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);
            let request = objectStore.openCursor();
            request.onsuccess = (event) => {
                let cursor = event.target.result;
                if(cursor) {
                    res.push(cursor.value);

                    if(!size || res.length < size) {
                        cursor.continue();
                    }
                }
            }
        });
    }

    /**
    * 根据键值从数据库获取数据
    * @method count
    * @param {String} name
    * @param {*} data
    * @return {Promise}
    **/
    count(name, data) {
        // 请求结果
        let res = 0;

        return new Promise((resolve, reject) => {
            // 创建事务
            let transaction = this.db.transaction(name);

            // 事务处理成功
            transaction.oncomplete = () => {
                resolve({
                    message: 'count: 事务处理成功',
                    data: res
                });
            }

            // 事务处理异常
            transaction.onerror = (event) => {
                reject({
                    message: 'count: 事务处理异常',
                    data: event
                });
            }

            let objectStore = transaction.objectStore(name);

            // 计算一个键值
            if(checkType(data) == 'string' || checkType(data) == 'number') {
                let request = objectStore.count(data);
                request.onsuccess = () => {
                    res += request.result;
                };
            }// 计算一组键值
            else if(checkType(data) == 'array') {
                for(let i in data) {
                    let request = objectStore.count(data[i]);
                    request.onsuccess = () => {
                        res += request.result;
                    };
                }
            }// key range
            else if(data instanceof IDBKeyRange) {
                let request = objectStore.count(data);
                request.onsuccess = () => {
                    res += request.result;
                };
            }
        });
    }
}

export default Database;

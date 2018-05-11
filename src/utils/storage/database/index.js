import IndexedDBClass from './indexedDB';
import config from './config.json';

/* 创建 indexedDB 操作实例 */
const IndexedDB = new IndexedDBClass();

let debug = require('debug')('app:indexedDB');

/**
* 数据库操作对象
* @class DBOperator
**/
class DBOperator {
    constructor(db, name) {
        this.databse = db;
        this.name = name;
    }

    /**
    * 向指定存储空间添加数据
    * @method add
    * @param {*} data
    * @return {Promise}
    **/
    add(data) {
        return this.databse.add(this.name, data);
    }

    /**
    * 修改指定存储空间的数据
    * @method put
    * @param {*} data
    * @return {Promise}
    **/
    put(data) {
        return this.databse.put(this.name, data);
    }

    /**
    * 向指定存储空间删除数据
    * @method delete
    * @param {*} data
    * @return {Promise}
    **/
    delete(data) {
        return this.databse.delete(this.name, data);
    }

    /**
    * 根据键值从数据库获取数据
    * @method get
    * @param {*} data
    * @return {Promise}
    **/
    get(data) {
        return this.databse.get(this.name, data);
    }

    /**
    * 根据索引从数据库获取数据
    * @method getByIndex
    * @param {String} indexName
    * @param {*} data
    * @return {Promise}
    **/
    getByIndex(indexName, data) {
        return this.databse.getByIndex(this.name, indexName, data);
    }

    /**
    * 从数据库获取指定数量的数据（size 为空，则获取所有数据）
    * @method get
    * @param {String} name
    * @param {Integer} size
    * @return {Promise}
    **/
    getBySize(name, size) {
        return this.databse.getBySize(this.name, size);
    }

    /**
    * 根据键值计算数据的数量
    * @method count
    * @param {*} data
    * @return {Promise}
    **/
    count(data) {
        return this.databse.count(this.name, data);
    }
}

/**
* 数据库对象
* @class Database
**/
class Database {
    /**
    * 数据库初始化方法
    * @method init
    **/
    init() {
        return new Promise((resolve, reject) => {
            if(IndexedDB.open) {
                IndexedDB.open(config.name, config.version).then((json) => {
                    // 数据库打开成功
                    if(json.code == 1) {
                        debug('数据库打开成功...');
                    }// 数据库更新成功
                    else if(json.code == 2) {
                        let { db }  = IndexedDB;
                        // let transaction = json.event.target.transaction;

                        /* 根据配置信息创建数据表 */
                        let { objectStores } = config;
                        if(objectStores) {
                            objectStores.forEach((store) => {
                                let storeName = store.name;

                                // 如果存储空间已存在，则删除原存储空间
                                if(Array.prototype.indexOf.call(db.objectStoreNames, storeName) >= 0) {
                                    debug(`${storeName} 表已存在，删除...`);
                                    db.deleteObjectStore(storeName);
                                }

                                /* 创建对象存储空间 */
                                // 使用 'ssn' 作为我们的 key path 因为它保证是唯一的
                                let objectStore = db.createObjectStore(storeName, store.options || {});

                                /* 创建索引 */
                                // 根据配置信息创建索引表
                                let indexConfig = store.index;
                                if(indexConfig) {
                                    indexConfig.forEach((index) => {
                                        objectStore.createIndex(index.key, index.name, index.options);
                                    });
                                }
                            });
                        }
                    }

                    /* 创建数据库快捷操作类 */
                    let { objectStores } = config;
                    objectStores.forEach((store) => {
                        let storeName = store.name;
                        this[`${storeName}`] = new DBOperator(IndexedDB, storeName);
                    });

                    resolve();
                });
            } else {
                reject();
            }
        });
    }
}

export default Database;

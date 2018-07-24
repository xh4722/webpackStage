import { checkType } from 'utils/library';

/**
* 事件管理器
* @class EventEmitter
**/
class EventEmitter {
    constructor() {
        this.eventList = {};
    }

    /**
    * 监听事件绑定函数
    * @method addListener
    * @param {String} name
    * @param {Function} listener
    **/
    addListener(name, listener) {
        if(!this.eventList[name]) {
            this.eventList[name] = [];
        }
        this.eventList[name].push(listener);
    }

    /**
     * 监听事件解绑函数
     * @method removeListener
     * @param {String} name
     * @param {Function} listener
     */
    removeListener(name, listener) {
        if(!this.eventList[name]) {
            return;
        }

        this.eventList[name] = this.eventList[name].filter(event => {
            if(checkType(event) == 'function') {
                return event != listener;
            } else if(checkType(event) == 'object') {
                return event.listener != listener;
            } else {
                return true;
            }
        });
    }

    /**
    * 设置一个只会触发一次的监听函数
    * @method once
    * @param {String} name
    * @param {Function} listener
    **/
    once(name, listener) {
        if(!this.eventList[name]) {
            this.eventList[name] = [];
        }

        this.eventList[name].push({
            listener,
            once: true
        });
    }

    /**
    * 事件触发函数
    * @method emit
    * @param {String} name
    * @param {Array} args
    **/
    emit(name, ...args) {
        if(!this.eventList[name]) {
            return;
        }

        this.eventList[name].forEach((event) => {
            let listener = null;
            let once = false;

            if(checkType(event) == 'function') {
                listener = event;
            } else if(checkType(event) == 'object' && checkType(event.listener) == 'function') {
                listener = event.listener;
                once = event.once;
            }

            if(listener) {
                listener.apply(event, args);
                // 单次执行函数
                if(once) {
                    this.off(name, listener);
                }
            }
        });
    }

    /**
    * 监听事件移除函数
    * @method removeAllListeners
    * @param {String} name
    **/
    removeAllListeners(name) {
        if(!name) {
            for(let key in this.eventList) {
                this.eventList[key] = [];
            }
        } else {
            this.eventList[name] = [];
        }
    }
}

export default EventEmitter;

import _ from 'lodash';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LoadDataConstants from '../constants/LoadDataConstants';
import EventEmitter from 'events';

const ActionTypes = LoadDataConstants.ActionTypes;
const CHANGE_EVENT = 'change';

let data = {};

const LoadDataStore = _.assign({}, EventEmitter.prototype, {
    emitChange() {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // 获取store内保存的data
    getData() {
        return data;
    },
});

LoadDataStore.dispatchToken = AppDispatcher.register(action => {
    switch (action.type) {
        // 收到数据
        // 调用emitChange来重新刷新LoadData页面
        case ActionTypes.RECEIVED_DATA:
            data = action.data; //更新store
            LoadDataStore.emitChange();
            break;
        default:
        // do nothing
    }
});

export { LoadDataStore };

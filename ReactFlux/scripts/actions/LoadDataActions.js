import LoadDataWebApiUtils from '../utils/LoadDataWebApiUtils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LoadDataConstants from '../constants/LoadDataConstants';

const ActionTypes = LoadDataConstants.ActionTypes;

export default {
    // 请求数据的action
    requestData(reddit) {
        // 调用WebApi来获取数据
        return LoadDataWebApiUtils.requestData(reddit);
    },

    // 收到数据的action
    // 收到数据后发送这个action以及data给store
    receivedData(data) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVED_DATA,
            data,
        });
    },
};
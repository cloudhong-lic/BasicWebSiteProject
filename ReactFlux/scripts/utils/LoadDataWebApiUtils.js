import _ from 'lodash';
import 'whatwg-fetch';

import LoadDataActions from '../actions/LoadDataActions';

export default {
    requestData(reddit) {
        
        // 从这个地址获取数据
        const url = `https://www.reddit.com/r/${reddit}.json`;

        fetch(url)
            .then((response) => {
                // 将response转换成json格式
                return response.json();
            })
            .then((json) => {
                // 处理获取到的json数据
                // 不同的json格式处理方式不同, 需要不同对待
                const data = _.map(json.data.children, 'data');

                // 发送一个已收到数据的action
                LoadDataActions.receivedData(data);
            })
            .catch((error) => {
                console.log('Error: ', error);
            });
    },
};

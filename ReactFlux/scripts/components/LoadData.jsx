import _ from 'lodash';
import React from 'react';
import LoadDataActions from '../actions/LoadDataActions.js';
import { LoadDataStore } from '../stores/LoadDataStore.js';

// 由于constructor需要调用这个function, 所以需要放在class外面
function getStateFromStore() {
  return {
    data: LoadDataStore.getData(),
  };
}

class LoadData extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStore();

    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    LoadDataStore.addChangeListener(this._onChange);

    // 发送请求数据的action
    LoadDataActions.requestData('reactjs');
  }

  componentWillUnmount() {
    LoadDataStore.removeChangeListener(this._onChange);
  }

  // 通过emitChange来获取此event
  // 任何setState会刷新页面
  _onChange() {
    this.setState(getStateFromStore());
  }

  render() {
    return (
      <div className="loaddata">
        <div>
          <p>This part is from web api</p>
        </div>
        <ul>
          {_.map(this.state.data, (post, i) =>
            <li key={i}>{post.title}</li>)}
        </ul>
      </div>
    );
  }
}

// 加了default后, 在以后import的时候就可以不用花括号了
// 如果不加, import必须用花括号
// export function Func () { }
// import { Func } from 'func'
// export default function Func () { }
// import Func from 'func'
export default LoadData;

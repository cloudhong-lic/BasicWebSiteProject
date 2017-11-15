import React from 'react';
import Footer from './Footer.react';
import Header from './Header.react';
import MainSection from './MainSection.react';

import { TodoStore } from '../stores/TodoStore';

// 从TodoStore获取数据
function getTodoState() {
  return {
    allTodos: TodoStore.getAll(),
    areAllComplete: TodoStore.areAllComplete()
  };
}

export default class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = getTodoState();

    // 此处需要bind事件, 但有的components却不需要
    // 原理目前不是很清楚, 暂时认为是因为这个component有setState
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount() {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.removeChangeListener(this._onChange);
  }

  // Event handler for 'change' events coming from the TodoStore
  _onChange() {
    this.setState(getTodoState());
  }

  render() {
    return (
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    );
  }
}

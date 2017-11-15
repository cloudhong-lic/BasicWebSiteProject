import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput.react';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };

    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onDestroyClick = this._onDestroyClick.bind(this);
  }

  _onToggleComplete() {
    TodoActions.toggleComplete(this.props.todo);
  }

  _onDoubleClick() {
    this.setState({isEditing: true});
  }

  _onSave(text) {
    TodoActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  }

  _onDestroyClick() {
    TodoActions.destroy(this.props.todo.id);
  }

  render() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <TodoTextInput
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={this._onToggleComplete}
          />
          <label onDoubleClick={this._onDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} />
        </div>
        {input}
      </li>
    );
  }
}

// ES5 的写法
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired
};
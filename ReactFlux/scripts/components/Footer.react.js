import React from 'react';
import PropTypes from 'prop-types';
import TodoActions from '../actions/TodoActions';
import LoadData from './LoadData';

export default class Footer extends React.Component {

  _onClearCompletedClick() {
    TodoActions.destroyCompleted();
  }

  render() {
    var allTodos = this.props.allTodos;
    var total = Object.keys(allTodos).length;

    if (total === 0) {
      return (
        <footer id="footer">
          <LoadData />
        </footer>
      );
    }

    var completed = 0;
    for (var key in allTodos) {
      if (allTodos[key].complete) {
        completed++;
      }
    }

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

  	return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {clearCompletedButton}
      </footer>
    );
  }
}

// ES5 的写法
Footer.propTypes = {
  allTodos: PropTypes.object.isRequired
};
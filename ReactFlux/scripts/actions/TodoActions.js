import AppDispatcher from '../dispatcher/AppDispatcher';
import TodoConstants from '../constants/TodoConstants';

const ActionTypes = TodoConstants.ActionTypes;

export default {

  create(text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_CREATE,
      text: text
    });
  },

  updateText(id, text) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  toggleComplete(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        ActionTypes.TODO_UNDO_COMPLETE :
        ActionTypes.TODO_COMPLETE;

    AppDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  toggleCompleteAll() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  destroy(id) {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_DESTROY,
      id: id
    });
  },

  destroyCompleted() {
    AppDispatcher.dispatch({
      actionType: ActionTypes.TODO_DESTROY_COMPLETED
    });
  }
};

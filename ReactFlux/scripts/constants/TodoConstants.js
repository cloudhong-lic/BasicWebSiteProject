import keyMirror from 'keymirror';

export default {
  ActionTypes: keyMirror({
    TODO_CREATE: null,
    TODO_COMPLETE: null,
    TODO_DESTROY: null,
    TODO_DESTROY_COMPLETED: null,
    TODO_TOGGLE_COMPLETE_ALL: null,
    TODO_UNDO_COMPLETE: null,
    TODO_UPDATE_TEXT: null
  })
};

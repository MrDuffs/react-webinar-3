// Начальное состояние
const initialState = {
  data: {},
  count: 0,
  waiting: false // признак ожидания загрузки
}

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: {}, waiting: true};

    case "comments/load-success":
      return {
        ...state,
        data: action.payload.data,
        count: action.payload.data.count,
        waiting: false
      };

    case "comments/load-error":
      return { ...state, data: {}, waiting: false}; //@todo текст ошибки сохранить?

    case "comments/post-start":
      return {...state, waiting: true};

    case "comments/post-success":
      return {
        ...state,
        data: {
          items: [...state.data.items, action.payload.data],
          count: state.count + 1,
        },
        count: state.count + 1,
        waiting: false
      };

    case "comments/post-error":
      return {...state, waiting: false};

    default:
      // Нет изменений
      return state;
  }

}

export default reducer;

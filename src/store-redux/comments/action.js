export default {
  load: (id) => {
    return async (dispatch, getState, services) => {
      //
      dispatch({type: 'comments/load-start'});

      try {
        const res = await services.api.request({
          url: `api/v1/comments?search[parent]=${id}&limit=*&fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type,_tree)),count`
        });
        // Комментарии загружены успешно
        dispatch({type: 'comments/load-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/load-error'});
      }
    }
  },

  post: (text, parent) => {
    return async (dispatch, getState, services) => {
      dispatch({type: 'comments/post-start'});

      try {
        const res = await services.api.request({
          url: `api/v1/comments?fields=*,author(profile)`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent: parent
          })
        });
        // Комментарий загружен успешно
        dispatch({type: 'comments/post-success', payload: {data: res.data.result}});

      } catch (e) {
        //Ошибка загрузки
        dispatch({type: 'comments/post-error'});
      }
    }
  }
}

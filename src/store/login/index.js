import StoreModule from '../module';

/**
 * Состояние авторизации
 */
class LoginState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userName: '',
      isAuth: false,
      error: '',
      waiting: false
    }
  }

  setError(error) {
    this.setState({
      ...this.getState(),
      error: error
    });
  }

  async checkAuth() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1//users/self?fields=_id,profile(name)', {
        headers: {
          "X-Token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      if (json.error) {
        json.error.data.issues.forEach(error => {
          if (!error.path.length) throw new Error(error.message);
        });
      }

      this.setState({
        ...this.getState(),
        userName: json.result.profile?.name,
        isAuth: true,
        error: '',
        waiting: false
      }, 'Пользователь авторизован');

    } catch (err) {
      console.log(err);
      this.setState({
        userName: '',
        isAuth: false,
        error: '',
        waiting: false
      }, 'Ошибка при авторизации пользователя');
    }
  }

  async logIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {

      const response = await fetch('/api/v1//users/sign?fields=_id,profile(name)', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });

      const json = await response.json();

      if (json.error) {
        json.error.data.issues.forEach(error => {
          if (!error.path.length) throw new Error(error.message);
        });
      }

      if (json.result?.token) {
        localStorage.setItem('token', json.result.token);
      }

      await this.store.actions.profile.loadUser();

      this.setState({
        ...this.getState(),
        userName: json.result.user?.profile?.name,
        isAuth: true,
        error: '',
        waiting: false
      }, 'Успешная авторизация пользователя');

    } catch (err) {
      this.setState({
        ...this.getState(),
        username: '',
        isAuth: false,
        error: err.message,
        waiting: false
      }, 'Ошибка запроса');
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1//users/sign', {
        method: 'DELETE',
        headers: {
          "X-Token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      if (json.result) {
        localStorage.removeItem('token');

        this.setState({
          ...this.getState(),
          userName: '',
          isAuth: false,
          waiting: false
        }, 'Выход пользователя из аккаунта');
      } else {
        throw new Error('Произошла ошибка');
      }

    } catch (err) {
      this.setState({
        ...this.getState(),
        error: err.message,
        waiting: false
      }, 'Ошибка запроса');
    }
  }
}

export default LoginState;

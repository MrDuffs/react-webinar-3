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
      userData: null,
      error: '',
      waiting: false
    }
  }

  async loadUser() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1//users/self?fields=_id,email,profile', {
        headers: {
          "X-Token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        userData: json.result,
        error: '',
        waiting: false
      }, 'Пользователь авторизован');

    } catch (err) {
      this.setState({
        userData: {},
        error: err,
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
      if (!login || !password) throw new Error('Отсутствует логин или пароль');

      const response = await fetch('/api/v1//users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });

      const json = await response.json();

      if (json.error?.code === 'Validation') throw new Error('Введены неправильные логин или пароль');

      if (json.result?.token) {
        localStorage.setItem('token', json.result.token);
      }

      this.setState({
        ...this.getState(),
        userData: json.result.user,
        waiting: false
      }, 'Успешная авторизация пользователя');

    } catch (err) {
      this.setState({
        ...this.getState(),
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
          userData: null,
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

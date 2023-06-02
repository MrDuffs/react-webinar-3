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
      const response = await fetch('/api/v1//users/self', {
        headers: {
          "X-Token": localStorage.getItem('token')
        }
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        data: json.result,
        waiting: false
      }, 'Загружен пользователь из АПИ');

    } catch (err) {
      this.setState({
        data: {},
        error: err,
        waiting: false
      }, 'Ошибка при загрузке пользователя');
    }
  }

  async logIn(login, password) {
    try {
      if (!login || !password) throw new Error('Отсутствует логин или пароль');

      const response = await fetch('/api/v1//users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login, password})
      });

      console.log(response);

      // if (!response.ok) throw new Error('Введены неправильные данные');

      const { result } = await response.json();

      if (result?.token) {
        localStorage.setItem('token', result.token);
        await this.loadUser();
      }

    } catch (err) {
      console.log('Error');
      console.log(err.message);
      // this.setState({
      //   ...this.getState(),
      //   error: err.message
      // });
    }
  }
}

export default LoginState;

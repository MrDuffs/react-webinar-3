import StoreModule from '../module';

class ProfileState extends StoreModule {
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

      if (json.error) {
        throw new Error();
      }

      this.setState({
        ...this.getState(),
        userData: json.result,
        error: '',
        waiting: false
      }, 'Пользователь авторизован');

    } catch (err) {
      this.setState({
        userData: null,
        error: err,
        waiting: false
      }, 'Ошибка при авторизации пользователя');
    }
  }

  async removeUser() {
    this.setState({
      userData: null,
      error: "",
    });
  }

}

export default ProfileState;

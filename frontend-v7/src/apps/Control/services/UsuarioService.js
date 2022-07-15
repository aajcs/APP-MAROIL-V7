import axios from 'axios'

export class UsuarioService {
  // baseUrl = "http://localhost:8080/api/usuarios/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/"
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/usuarios/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'usuario/', config).then((res) => res.data)
  }

  create(usuario, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'usuario/', usuario, config)
      .then((res) => res.data)
  }

  update(usuario, token) {
    const config = {
      headers: {
        Authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'usuario/' + usuario.id, usuario, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'usuario/' + id, config)
      .then((res) => res.data)
  }
  // verificar si lo estoy usando
  // login(credentials) {
  //   return axios
  //     .post(this.baseUrl + 'usuario/login', credentials)
  //     .then((res) => res.data)
  //   console.log(credentials)
  // }
}

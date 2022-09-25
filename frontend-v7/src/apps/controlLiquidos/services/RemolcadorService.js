import axios from 'axios'

export class RemolcadorService {
  // baseUrl = "http://localhost:8080/api/Remolcadors/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Remolcadors/";
  baseUrl = 'http://localhost:4000/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Remolcador/', config)
      .then((res) => res.data)
  }

  create(Remolcador, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Remolcador/', Remolcador, config)
      .then((res) => res.data)
  }

  update(Remolcador, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Remolcador/' + Remolcador.id, Remolcador, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Remolcador/' + id, config)
      .then((res) => res.data)
  }
}

import axios from 'axios'

export class GanadorService {
  // baseUrl = "http://localhost:8080/api/ganadors/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ganadors/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'ganador/', config).then((res) => res.data)
  }

  create(ganador, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ganador/', ganador, config)
      .then((res) => res.data)
  }

  update(ganador, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'ganador/' + ganador.id, ganador, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'ganador/' + id, config)
      .then((res) => res.data)
  }
}

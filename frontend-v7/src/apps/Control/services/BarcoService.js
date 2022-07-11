import axios from 'axios'

export class BarcoService {
  // baseUrl = "http://localhost:8080/api/barcos/";
  // baseUrl = '  http://10.20.40.196:4000/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/barcos/";
  baseUrl = 'http://10.20.40.196:4000/api/'
  // baseUrl = 'http://10.20.40.196:4000/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'barco/', config).then((res) => res.data)
  }

  create(barco, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'barco/', barco, config)
      .then((res) => res.data)
  }

  update(barco, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'barco/' + barco.id, barco, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'barco/' + id, config)
      .then((res) => res.data)
  }
}

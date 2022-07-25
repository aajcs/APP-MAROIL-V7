import axios from 'axios'

export class IngresoGastoService {
  // baseUrl = "http://localhost:8080/api/IngresoGastos/";
  // baseUrl = '  http://localhost:4000/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/IngresoGastos/";
  baseUrl = 'http://localhost:4000/api/'
  // baseUrl = 'http://localhost:4000/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'IngresoGasto/', config)
      .then((res) => res.data)
  }

  create(IngresoGasto, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'IngresoGasto/', IngresoGasto, config)
      .then((res) => res.data)
  }

  update(IngresoGasto, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'IngresoGasto/' + IngresoGasto.id,
        IngresoGasto,
        config
      )
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'IngresoGasto/' + id, config)
      .then((res) => res.data)
  }
}

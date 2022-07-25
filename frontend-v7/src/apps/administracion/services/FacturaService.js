import axios from 'axios'

export class FacturaService {
  // baseUrl = "http://localhost:8080/api/facturas/";
  // baseUrl = '  http://localhost:4000/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/facturas/";
  baseUrl = 'http://localhost:4000/api/'
  // baseUrl = 'http://localhost:4000/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'factura/', config).then((res) => res.data)
  }

  create(factura, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'factura/', factura, config)
      .then((res) => res.data)
  }

  update(factura, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'factura/' + factura.id, factura, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'factura/' + id, config)
      .then((res) => res.data)
  }
}

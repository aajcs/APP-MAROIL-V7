import axios from 'axios'

export class GastosOperacionaleService {
  // baseUrl = "http://localhost:8080/api/GastosOperacionales/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/GastosOperacionales/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'GastosOperacionale/', config)
      .then((res) => res.data)
  }

  create(GastosOperacionale, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'GastosOperacionale/', GastosOperacionale, config)
      .then((res) => res.data)
  }

  update(GastosOperacionale, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'GastosOperacionale/' + GastosOperacionale.id,
        GastosOperacionale,
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
      .delete(this.baseUrl + 'GastosOperacionale/' + id, config)
      .then((res) => res.data)
  }
}

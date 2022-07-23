import axios from 'axios'

export class CargaBodegaService {
  // baseUrl = "http://localhost:8080/api/cargaBodegas/";
  // baseUrl = '  http://localhost:4000/api/'
  baseUrl = 'http://localhost:4000/api/'
  // baseUrl = 'http://localhost:4000/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/cargaBodegas/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'cargaBodega/', config)
      .then((res) => res.data)
  }

  create(cargaBodega, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'cargaBodega/', cargaBodega, config)
      .then((res) => res.data)
  }

  update(cargaBodega, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'cargaBodega/' + cargaBodega.id, cargaBodega, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'cargaBodega/' + id, config)
      .then((res) => res.data)
  }
}

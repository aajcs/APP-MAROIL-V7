import axios from 'axios'

export class TanqueAuxService {
  // baseUrl = "http://localhost:8080/api/TanqueAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/TanqueAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'TanqueAux/', config)
      .then((res) => res.data)
  }

  create(TanqueAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'TanqueAux/', TanqueAux, config)
      .then((res) => res.data)
  }

  update(TanqueAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'TanqueAux/' + TanqueAux.id, TanqueAux, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'TanqueAux/' + id, config)
      .then((res) => res.data)
  }
}

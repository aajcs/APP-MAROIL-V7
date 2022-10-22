import axios from 'axios'

export class ProcesoAuxService {
  // baseUrl = "http://localhost:8080/api/ProcesoAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ProcesoAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ProcesoAux/', config)
      .then((res) => res.data)
  }

  create(ProcesoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ProcesoAux/', ProcesoAux, config)
      .then((res) => res.data)
  }

  update(ProcesoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'ProcesoAux/' + ProcesoAux.id, ProcesoAux, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'ProcesoAux/' + id, config)
      .then((res) => res.data)
  }
}

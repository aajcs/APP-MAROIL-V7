import axios from 'axios'

export class CentroDeCostoAuxService {
  // baseUrl = "http://localhost:8080/api/CentroDeCostoAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/CentroDeCostoAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'CentroDeCostoAux/', config)
      .then((res) => res.data)
  }

  create(CentroDeCostoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'CentroDeCostoAux/', CentroDeCostoAux, config)
      .then((res) => res.data)
  }

  update(CentroDeCostoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'CentroDeCostoAux/' + CentroDeCostoAux.id,
        CentroDeCostoAux,
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
      .delete(this.baseUrl + 'CentroDeCostoAux/' + id, config)
      .then((res) => res.data)
  }
}

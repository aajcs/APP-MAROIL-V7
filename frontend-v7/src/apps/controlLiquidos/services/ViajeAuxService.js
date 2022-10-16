import axios from 'axios'

export class ViajeAuxService {
  // baseUrl = "http://localhost:8080/api/ViajeAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ViajeAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'ViajeAux/', config).then((res) => res.data)
  }

  create(ViajeAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ViajeAux/', ViajeAux, config)
      .then((res) => res.data)
  }

  update(ViajeAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'ViajeAux/' + ViajeAux.id, ViajeAux, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'ViajeAux/' + id, config)
      .then((res) => res.data)
  }
}

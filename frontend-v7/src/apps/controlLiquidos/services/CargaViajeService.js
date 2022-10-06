import axios from 'axios'

export class CargaViajeService {
  // baseUrl = "http://localhost:8080/api/CargaViajes/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/CargaViajes/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'CargaViaje/', config)
      .then((res) => res.data)
  }

  create(CargaViaje, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'CargaViaje/', CargaViaje, config)
      .then((res) => res.data)
  }

  update(CargaViaje, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'CargaViaje/' + CargaViaje.id, CargaViaje, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'CargaViaje/' + id, config)
      .then((res) => res.data)
  }
}

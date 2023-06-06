import axios from 'axios'

export class CajaChicaService {
  // baseUrl = "http://localhost:8080/api/CajaChicas/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/CajaChicas/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'CajaChica/', config)
      .then((res) => res.data)
  }

  create(CajaChica, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'CajaChica/', CajaChica, config)
      .then((res) => res.data)
  }

  update(CajaChica, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'CajaChica/' + CajaChica.id, CajaChica, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'CajaChica/' + id, config)
      .then((res) => res.data)
  }
}

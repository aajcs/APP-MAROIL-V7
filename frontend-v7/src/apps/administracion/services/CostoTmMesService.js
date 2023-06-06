import axios from 'axios'

export class CostoTmMesService {
  // baseUrl = "http://localhost:8080/api/CostoTmMess/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/CostoTmMess/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'CostoTmMes/', config)
      .then((res) => res.data)
  }

  create(CostoTmMes, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'CostoTmMes/', CostoTmMes, config)
      .then((res) => res.data)
  }

  update(CostoTmMes, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'CostoTmMes/' + CostoTmMes.id, CostoTmMes, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'CostoTmMes/' + id, config)
      .then((res) => res.data)
  }
}

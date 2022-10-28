import axios from 'axios'

export class ReporteGerenciaService {
  // baseUrl = "http://localhost:8080/api/ReporteGerencias/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ReporteGerencias/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ReporteGerencia/', config)
      .then((res) => res.data)
  }

  create(ReporteGerencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ReporteGerencia/', ReporteGerencia, config)
      .then((res) => res.data)
  }

  update(ReporteGerencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'ReporteGerencia/' + ReporteGerencia.id,
        ReporteGerencia,
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
      .delete(this.baseUrl + 'ReporteGerencia/' + id, config)
      .then((res) => res.data)
  }
}

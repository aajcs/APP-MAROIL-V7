import axios from 'axios'

export class ReporteHoraService {
  // baseUrl = "http://localhost:8080/api/reporteHoras/";
  //baseUrl = '  https://apimaroil.herokuapp.com/api/'
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/reporteHoras/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'reporteHora/', config)
      .then((res) => res.data)
  }

  create(reporteHora, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'reporteHora/', reporteHora, config)
      .then((res) => res.data)
  }

  update(reporteHora, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'reporteHora/' + reporteHora.id, reporteHora, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'reporteHora/' + id, config)
      .then((res) => res.data)
  }
}

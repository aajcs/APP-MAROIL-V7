import axios from 'axios'

export class ReporteCargaService {
  // baseUrl = "http://localhost:8080/api/reporteCargas/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/reporteCargas/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'reporteCarga/', config)
      .then((res) => res.data)
  }

  create(reporteCarga, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'reporteCarga/', reporteCarga, config)
      .then((res) => res.data)
  }

  update(reporteCarga, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'reporteCarga/' + reporteCarga.id,
        reporteCarga,
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
      .delete(this.baseUrl + 'reporteCarga/' + id, config)
      .then((res) => res.data)
  }
}

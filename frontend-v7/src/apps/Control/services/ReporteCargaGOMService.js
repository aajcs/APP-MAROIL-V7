import axios from 'axios'

export class ReporteCargaGOMService {
  // baseUrl = "http://localhost:8080/api/reporteCargaGOMs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  //  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/reporteCargaGOMs/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'reporteCargaGOM/', config)
      .then((res) => res.data)
  }

  create(reporteCargaGOM, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'reporteCargaGOM/', reporteCargaGOM, config)
      .then((res) => res.data)
  }

  update(reporteCargaGOM, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'reporteCargaGOM/' + reporteCargaGOM.id,
        reporteCargaGOM,
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
      .delete(this.baseUrl + 'reporteCargaGOM/' + id, config)
      .then((res) => res.data)
  }
}

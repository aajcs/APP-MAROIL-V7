import axios from 'axios'

export class ProformaService {
  // baseUrl = "http://localhost:8080/api/Proformas/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Proformas/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'Proforma/', config).then((res) => res.data)
  }

  create(Proforma, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Proforma/', Proforma, config)
      .then((res) => res.data)
  }

  update(Proforma, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Proforma/' + Proforma.id, Proforma, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Proforma/' + id, config)
      .then((res) => res.data)
  }
}

import axios from 'axios'

export class GabarraService {
  // baseUrl = "http://localhost:8080/api/gabarras/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/gabarras/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios.get(this.baseUrl + 'gabarra/', config).then((res) => res.data)
  }

  create(gabarra, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'gabarra/', gabarra, config)
      .then((res) => res.data)
  }

  update(gabarra, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'gabarra/' + gabarra.id, gabarra, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'gabarra/' + id, config)
      .then((res) => res.data)
  }
}

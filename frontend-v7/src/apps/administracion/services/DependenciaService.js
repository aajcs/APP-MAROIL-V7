import axios from 'axios'

export class DependenciaService {
  // baseUrl = "http://localhost:8080/api/Dependencias/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Dependencias/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Dependencia/', config)
      .then((res) => res.data)
  }

  create(Dependencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Dependencia/', Dependencia, config)
      .then((res) => res.data)
  }

  update(Dependencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Dependencia/' + Dependencia.id, Dependencia, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Dependencia/' + id, config)
      .then((res) => res.data)
  }
}

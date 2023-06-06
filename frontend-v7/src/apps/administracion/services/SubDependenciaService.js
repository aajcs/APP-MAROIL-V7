import axios from 'axios'

export class SubDependenciaService {
  // baseUrl = "http://localhost:8080/api/SubDependencias/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/SubDependencias/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'SubDependencia/', config)
      .then((res) => res.data)
  }

  create(SubDependencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'SubDependencia/', SubDependencia, config)
      .then((res) => res.data)
  }

  update(SubDependencia, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'SubDependencia/' + SubDependencia.id,
        SubDependencia,
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
      .delete(this.baseUrl + 'SubDependencia/' + id, config)
      .then((res) => res.data)
  }
}

import axios from 'axios'

export class ActividadAsociadaService {
  // baseUrl = "http://localhost:8080/api/ActividadAsociadas/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ActividadAsociadas/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ActividadAsociada/', config)
      .then((res) => res.data)
  }

  create(ActividadAsociada, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ActividadAsociada/', ActividadAsociada, config)
      .then((res) => res.data)
  }

  update(ActividadAsociada, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'ActividadAsociada/' + ActividadAsociada.id,
        ActividadAsociada,
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
      .delete(this.baseUrl + 'ActividadAsociada/' + id, config)
      .then((res) => res.data)
  }
}

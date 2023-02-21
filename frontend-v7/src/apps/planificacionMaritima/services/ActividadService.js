import axios from 'axios'

export class ActividadService {
  // baseUrl = "http://localhost:8080/api/Actividads/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://localhost:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Actividads/";
  baseUrl = 'http://localhost:4000/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Actividad/', config)
      .then((res) => res.data)
  }

  create(Actividad, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Actividad/', Actividad, config)
      .then((res) => res.data)
  }

  update(Actividad, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Actividad/' + Actividad.id, Actividad, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Actividad/' + id, config)
      .then((res) => res.data)
  }
}

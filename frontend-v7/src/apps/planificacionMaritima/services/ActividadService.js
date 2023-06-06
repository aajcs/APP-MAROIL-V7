import axios from 'axios'

export class ActividadService {
  // baseUrl = "http://localhost:8080/api/Actividads/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Actividads/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
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

  create(actividad, token) {
    const config = {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    }
    const form = new FormData()
    for (const key in actividad) {
      form.append(key, actividad[key])
    }
    console.log(form)
    return axios
      .post(this.baseUrl + 'Actividad/', form, config)
      .then((res) => res.data)
  }

  update(actividad, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Actividad/' + actividad.id, actividad, config)
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

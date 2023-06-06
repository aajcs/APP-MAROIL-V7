import axios from 'axios'

export class PresupuestoPMService {
  // baseUrl = "http://localhost:8080/api/PresupuestoPMs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/PresupuestoPMs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'PresupuestoPM/', config)
      .then((res) => res.data)
  }

  create(presupuestoPM, token) {
    const config = {
      headers: {
        authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    }
    const form = new FormData()
    for (const key in presupuestoPM) {
      form.append(key, presupuestoPM[key])
    }
    console.log(form)
    return axios
      .post(this.baseUrl + 'PresupuestoPM/', form, config)
      .then((res) => res.data)
  }

  update(presupuestoPM, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'PresupuestoPM/' + presupuestoPM.id,
        presupuestoPM,
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
      .delete(this.baseUrl + 'PresupuestoPM/' + id, config)
      .then((res) => res.data)
  }
}

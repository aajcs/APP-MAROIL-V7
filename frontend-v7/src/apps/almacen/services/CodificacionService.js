import axios from 'axios'

export class CodificacionService {
  // baseUrl = "http://localhost:8080/api/Codificacions/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Codificacions/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Codificacion/', config)
      .then((res) => res.data)
  }

  create(Codificacion, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Codificacion/', Codificacion, config)
      .then((res) => res.data)
  }

  update(Codificacion, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'Codificacion/' + Codificacion.id,
        Codificacion,
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
      .delete(this.baseUrl + 'Codificacion/' + id, config)
      .then((res) => res.data)
  }
}

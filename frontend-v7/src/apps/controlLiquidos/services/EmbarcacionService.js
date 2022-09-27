import axios from 'axios'

export class EmbarcacionService {
  // baseUrl = "http://localhost:8080/api/Embarcacions/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Embarcacions/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Embarcacion/', config)
      .then((res) => res.data)
  }

  create(Embarcacion, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Embarcacion/', Embarcacion, config)
      .then((res) => res.data)
  }

  update(Embarcacion, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Embarcacion/' + Embarcacion.id, Embarcacion, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Embarcacion/' + id, config)
      .then((res) => res.data)
  }
}

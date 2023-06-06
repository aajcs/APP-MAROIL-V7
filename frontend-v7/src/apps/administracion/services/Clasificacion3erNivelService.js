import axios from 'axios'

export class Clasificacion3erNivelService {
  // baseUrl = "http://localhost:8080/api/Clasificacion3erNivels/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Clasificacion3erNivels/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Clasificacion3erNivel/', config)
      .then((res) => res.data)
  }

  create(Clasificacion3erNivel, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(
        this.baseUrl + 'Clasificacion3erNivel/',
        Clasificacion3erNivel,
        config
      )
      .then((res) => res.data)
  }

  update(Clasificacion3erNivel, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'Clasificacion3erNivel/' + Clasificacion3erNivel.id,
        Clasificacion3erNivel,
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
      .delete(this.baseUrl + 'Clasificacion3erNivel/' + id, config)
      .then((res) => res.data)
  }
}

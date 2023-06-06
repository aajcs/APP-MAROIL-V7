import axios from 'axios'

export class Clasificacion4toNivelService {
  // baseUrl = "http://localhost:8080/api/Clasificacion4toNivels/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Clasificacion4toNivels/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Clasificacion4toNivel/', config)
      .then((res) => res.data)
  }

  create(Clasificacion4toNivel, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(
        this.baseUrl + 'Clasificacion4toNivel/',
        Clasificacion4toNivel,
        config
      )
      .then((res) => res.data)
  }

  update(Clasificacion4toNivel, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'Clasificacion4toNivel/' + Clasificacion4toNivel.id,
        Clasificacion4toNivel,
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
      .delete(this.baseUrl + 'Clasificacion4toNivel/' + id, config)
      .then((res) => res.data)
  }
}

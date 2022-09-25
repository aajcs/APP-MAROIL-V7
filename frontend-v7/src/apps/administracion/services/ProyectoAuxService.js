import axios from 'axios'

export class ProyectoAuxService {
  // baseUrl = "http://localhost:8080/api/proyectoAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/proyectoAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'proyectoAux/', config)
      .then((res) => res.data)
  }

  create(proyectoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'proyectoAux/', proyectoAux, config)
      .then((res) => res.data)
  }

  update(proyectoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'proyectoAux/' + proyectoAux.id, proyectoAux, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'proyectoAux/' + id, config)
      .then((res) => res.data)
  }
}

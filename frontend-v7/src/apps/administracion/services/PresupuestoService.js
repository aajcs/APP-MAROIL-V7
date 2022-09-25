import axios from 'axios'

export class PresupuestoService {
  // baseUrl = "http://localhost:8080/api/presupuestos/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/presupuestos/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'presupuesto/', config)
      .then((res) => res.data)
  }

  create(presupuesto, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'presupuesto/', presupuesto, config)
      .then((res) => res.data)
  }

  update(presupuesto, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'presupuesto/' + presupuesto.id, presupuesto, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'presupuesto/' + id, config)
      .then((res) => res.data)
  }
}

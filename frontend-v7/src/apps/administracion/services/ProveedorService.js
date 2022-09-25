import axios from 'axios'

export class ProveedorService {
  // baseUrl = "http://localhost:8080/api/Proveedors/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/Proveedors/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'Proveedor/', config)
      .then((res) => res.data)
  }

  create(Proveedor, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'Proveedor/', Proveedor, config)
      .then((res) => res.data)
  }

  update(Proveedor, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'Proveedor/' + Proveedor.id, Proveedor, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'Proveedor/' + id, config)
      .then((res) => res.data)
  }
}

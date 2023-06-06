import axios from 'axios'

export class ItemsProformaService {
  // baseUrl = "http://localhost:8080/api/ItemsProformas/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ItemsProformas/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ItemsProforma/', config)
      .then((res) => res.data)
  }

  create(ItemsProforma, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ItemsProforma/', ItemsProforma, config)
      .then((res) => res.data)
  }

  update(ItemsProforma, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'ItemsProforma/' + ItemsProforma.id,
        ItemsProforma,
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
      .delete(this.baseUrl + 'ItemsProforma/' + id, config)
      .then((res) => res.data)
  }
}

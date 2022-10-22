import axios from 'axios'

export class ConceptoAuxService {
  // baseUrl = "http://localhost:8080/api/ConceptoAuxs/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "http://10.20.40.159:4000/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/ConceptoAuxs/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'ConceptoAux/', config)
      .then((res) => res.data)
  }

  create(ConceptoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'ConceptoAux/', ConceptoAux, config)
      .then((res) => res.data)
  }

  update(ConceptoAux, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'ConceptoAux/' + ConceptoAux.id, ConceptoAux, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'ConceptoAux/' + id, config)
      .then((res) => res.data)
  }
}

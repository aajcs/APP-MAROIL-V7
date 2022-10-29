import axios from 'axios'

export class VolumetriaService {
  // baseUrl = "http://localhost:8080/api/volumetrias/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  //  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/volumetrias/";

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'volumetria/', config)
      .then((res) => res.data)
  }

  create(volumetria, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'volumetria/', volumetria, config)
      .then((res) => res.data)
  }

  update(volumetria, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(this.baseUrl + 'volumetria/' + volumetria.id, volumetria, config)
      .then((res) => res.data)
  }

  delete(id, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .delete(this.baseUrl + 'volumetria/' + id, config)
      .then((res) => res.data)
  }
}

import axios from 'axios'

export class MensualidadOpMesService {
  // baseUrl = "http://localhost:8080/api/MensualidadOpMess/";
  // baseUrl = '  https://apimaroil.herokuapp.com/api/'
  // baseUrl = "https://apimaroil.herokuapp.com/api/";
  // baseUrl = "https://hg-rest-api.herokuapp.com/api/MensualidadOpMess/";
  baseUrl = 'https://apimaroil.herokuapp.com/api/'
  // baseUrl = 'https://apimaroil.herokuapp.com/api/'

  readAll(token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .get(this.baseUrl + 'MensualidadOpMes/', config)
      .then((res) => res.data)
  }

  create(MensualidadOpMes, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .post(this.baseUrl + 'MensualidadOpMes/', MensualidadOpMes, config)
      .then((res) => res.data)
  }

  update(MensualidadOpMes, token) {
    const config = {
      headers: {
        authorization: token
      }
    }
    return axios
      .put(
        this.baseUrl + 'MensualidadOpMes/' + MensualidadOpMes.id,
        MensualidadOpMes,
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
      .delete(this.baseUrl + 'MensualidadOpMes/' + id, config)
      .then((res) => res.data)
  }
}

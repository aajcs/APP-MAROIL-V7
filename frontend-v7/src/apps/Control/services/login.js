import axios from 'axios'

const baseUrl = 'https://apimaroil.herokuapp.com/api/'
// const baseUrl = 'https://apimaroil.herokuapp.com/api/'
// const baseUrl = '  https://apimaroil.herokuapp.com/api/usuario/login'

// baseUrl = "  https://apimaroil.herokuapp.com/api/";
// baseUrl = "http://10.20.40.159:4000/api/";
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }

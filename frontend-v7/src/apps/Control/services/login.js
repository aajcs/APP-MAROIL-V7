import axios from 'axios'

const baseUrl = 'http://10.20.40.196:4000/api/'
// const baseUrl = 'http://10.20.40.196:4000/api/'
// const baseUrl = '  http://10.20.40.196:4000/api/usuario/login'

// baseUrl = "  http://10.20.40.196:4000/api/";
// baseUrl = "http://10.20.40.159:4000/api/";
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }

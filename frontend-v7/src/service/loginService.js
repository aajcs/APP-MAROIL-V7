import axios from 'axios'

const baseUrl = 'http://10.20.40.196:4000/api/usuario/login'
// const baseUrl = 'http://10.20.40.196:4000/api/usuario/login'
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)

  return data
}

export default { login }

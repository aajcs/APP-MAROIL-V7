import axios from 'axios'

const baseUrl = 'https://apimaroil.herokuapp.com/api/usuario/login'
// const baseUrl = 'https://apimaroil.herokuapp.com/api/usuario/login'
const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)

  return data
}

export default { login }

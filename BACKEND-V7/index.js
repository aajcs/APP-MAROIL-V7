/* eslint-disable space-before-function-paren */
require('dotenv').config()
require('./src/database')
const app = require('./src/app')

async function main() {
  await app.listen(app.get('port'))
  console.log('Server on port', app.get('port'))
}

main()

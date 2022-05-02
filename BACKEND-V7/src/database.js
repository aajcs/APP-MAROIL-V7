const mongoose = require('mongoose')

const URI =
  process.env.status === 'PROD' ? process.env.DBURI_PROD : process.env.DBURI_DEV

const db = mongoose.connection

// eslint-disable-next-line space-before-function-paren
function connect() {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  db.on('open', (_) => {
    console.log('Database connect')
    // console.log(URI);
  })

  db.on('error', (error) => console.log('Error: ', error))
}

connect()

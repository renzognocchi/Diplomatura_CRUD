const mongoose = require('mongoose')
process.loadEnvFile

//URI 
const URI = process.env.MONGODB_URLSTRING
const DATABASE_NAME = process.env.DATABASE_NAME 

// conexion a Mongodb 

const DbConection = () => { return mongoose
    .connect(URI + DATABASE_NAME)
    .then(() => console.log('conectado correctamente a la base de datos'))
    .catch(() => console.log('error al conectarse la base de datos'))
}

module.exports =  DbConection 
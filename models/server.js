const express = require('express');
const cors = require('cors')
require('dotenv').config();

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.searchPath = '/api/search'

    // Middlewares
    this.middlewares();

    // rutas de la aplicacion
    this.routes();

  }

  middlewares() {

    // CORS

    this.app.use(cors());

    // parseo y lectura del body
    this.app.use(express.json())

    // directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.searchPath, require('../routes/search'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('servidor corriendo en puerto', this.port)
    })
  }

}
module.exports = Server;
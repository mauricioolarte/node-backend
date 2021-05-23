// este es controlador de las rutas, aqui va la logica de la ruta

const { response, request } = require('express');

const generalRouteGet = (req = request, res = response) => {

  const body = req.body;
  res.json({
    'msg': 'get API - controlador'
  })
}

module.exports = {
  generalRouteGet
} 
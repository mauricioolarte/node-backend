const { Router } = require('express');
const { generalRouteGet } = require('../controllers/generalroutes');

const router = Router();

//aqui van todas las rutas y su logica

router.get('/', generalRouteGet);








module.exports = router;
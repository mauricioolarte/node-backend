const { Router } = require('express');
const { searchPost } = require('../controllers/search');

const router = Router();

//aqui van todas las rutas y su logica

router.post('/', searchPost);








module.exports = router;
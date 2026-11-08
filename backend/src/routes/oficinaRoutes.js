const express = require('express')

const {
    cadastrarOficina,
    listarOficinas
} = require('../controllers/oficinaController')

const autenticarUsuario = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', autenticarUsuario, cadastrarOficina)
router.get('/', autenticarUsuario, listarOficinas)

module.exports = router
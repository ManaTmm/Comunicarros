const express = require('express')

const {
    cadastrarOficina,
    listarOficinas,
    editarOficina
} = require('../controllers/oficinaController')

const autenticarUsuario = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/', autenticarUsuario, cadastrarOficina)
router.get('/', autenticarUsuario, listarOficinas)
router.patch('/:oficinaId', autenticarUsuario, editarOficina)

module.exports = router
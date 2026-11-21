const express = require('express')

const {
    cadastrarOficina,
    listarOficinas,
    editarOficina,
    listarOficinasPublicas,
    obterOficinaPublica
} = require('../controllers/oficinaController')

const autenticarUsuario = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/publicas', listarOficinasPublicas)
router.get('/publicas/:oficinaId', obterOficinaPublica)
router.post('/', autenticarUsuario, cadastrarOficina)
router.get('/', autenticarUsuario, listarOficinas)
router.patch('/:oficinaId', autenticarUsuario, editarOficina)

module.exports = router
const express = require('express')
const {
    cadastrarUsuario,
    obterPerfilUsuario,
    atualizarPerfilUsuario
} = require('../controllers/usuarioController')
const router = express.Router()
const autenticarUsuario = require('../middlewares/authMiddleware')

router.get('/perfil', autenticarUsuario, obterPerfilUsuario)
router.patch('/perfil', autenticarUsuario, atualizarPerfilUsuario)

router.post('/', cadastrarUsuario)

module.exports = router
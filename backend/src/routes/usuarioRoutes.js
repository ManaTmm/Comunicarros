const express = require('express')
const { cadastrarUsuario } = require('../controllers/usuarioController')
const router = express.Router()
const autenticarUsuario = require('../middlewares/authMiddleware')

router.get('/perfil', autenticarUsuario, (req, res) => {
    res.status(200).json({
        mensagem: 'Acesso autorizado!',
        usuario: req.usuario
    })
})

router.post('/', cadastrarUsuario)

module.exports = router
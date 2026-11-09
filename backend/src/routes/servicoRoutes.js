const express = require('express')

const {
    cadastrarServico,
    listarServicos,
    editarServico,
    excluirServico
} = require('../controllers/servicoController')

const autenticarUsuario = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/oficina/:oficinaId', autenticarUsuario, cadastrarServico)

router.get('/oficina/:oficinaId', autenticarUsuario, listarServicos)

router.patch('/oficina/:oficinaId/servico/:servicoId', autenticarUsuario, editarServico)

router.delete('/oficina/:oficinaId/servico/:servicoId', autenticarUsuario, excluirServico)

module.exports = router
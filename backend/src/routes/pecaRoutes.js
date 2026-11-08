const express = require('express')

const {
    cadastrarPeca,
    listarPecas,
    editarPeca,
    excluirPeca
} = require('../controllers/pecaController')

const autenticarUsuario = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/oficina/:oficinaId', autenticarUsuario, cadastrarPeca)

router.get('/oficina/:oficinaId', autenticarUsuario, listarPecas)

router.patch('/oficina/:oficinaId/peca/:pecaId', autenticarUsuario, editarPeca)

router.delete('/oficina/:oficinaId/peca/:pecaId', autenticarUsuario, excluirPeca)

module.exports = router
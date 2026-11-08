const db = require('../config/database')
const bcrypt = require('bcryptjs')

async function cadastrarUsuario(req, res) {
    try {
        const { nome, email, senha, telefone } = req.body

        // Verifica se os campos obrigatórios foram preenchidos
        if (!nome || !email || !senha) {
            return res.status(400).json({
                mensagem: 'Nome, email e senha são obrigatórios.'
            })
        }

        // Verifica se o email já está cadastrado
        const [usuarios] = await db.query(
            'SELECT id FROM usuarios WHERE email = ?',
            [email]
        )

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensagem: 'Este email já está cadastrado.'
            })
        }

        // Gera o hash da senha
        const senhaHash = await bcrypt.hash(senha, 10)

        // Insere o novo usuário no banco
        const [resultado] = await db.query(
            `INSERT INTO usuarios (nome, email, senha, telefone)
             VALUES (?, ?, ?, ?)`,
            [nome, email, senhaHash, telefone || null]
        )

        return res.status(201).json({
            mensagem: 'Usuário cadastrado com sucesso!',
            usuario: {
                id: resultado.insertId,
                nome,
                email,
                telefone: telefone || null
            }
        })

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar usuário.'
        })
    }
}

module.exports = {
    cadastrarUsuario
}
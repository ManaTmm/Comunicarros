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

async function obterPerfilUsuario(req, res) {
    try {
        const [usuarios] = await db.query(
            `SELECT id, nome, email, telefone
             FROM usuarios
             WHERE id = ?`,
            [req.usuario.id]
        )

        if (usuarios.length === 0) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            })
        }

        return res.status(200).json({
            usuario: usuarios[0]
        })
    } catch (error) {
        console.error('Erro ao carregar perfil do usuário:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao carregar o perfil.'
        })
    }
}

async function atualizarPerfilUsuario(req, res) {
    const nome = typeof req.body.nome === 'string' ? req.body.nome.trim() : ''
    const email = typeof req.body.email === 'string'
        ? req.body.email.trim()
        : ''
    const telefone = typeof req.body.telefone === 'string'
        ? req.body.telefone.trim()
        : ''

    if (!nome || !email) {
        return res.status(400).json({
            mensagem: 'Nome e email são obrigatórios.'
        })
    }

    try {
        const [resultado] = await db.query(
            `UPDATE usuarios
             SET nome = ?, email = ?, telefone = ?
             WHERE id = ?`,
            [nome, email, telefone || null, req.usuario.id]
        )

        if (resultado.affectedRows === 0) {
            const [usuarios] = await db.query(
                'SELECT id FROM usuarios WHERE id = ?',
                [req.usuario.id]
            )

            if (usuarios.length === 0) {
                return res.status(404).json({
                    mensagem: 'Usuário não encontrado.'
                })
            }
        }

        const [usuarios] = await db.query(
            `SELECT id, nome, email, telefone
             FROM usuarios
             WHERE id = ?`,
            [req.usuario.id]
        )

        return res.status(200).json({
            mensagem: 'Perfil atualizado com sucesso.',
            usuario: usuarios[0]
        })
    } catch (error) {
        console.error('Erro ao atualizar perfil do usuário:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Este email já está cadastrado.'
            })
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao atualizar o perfil.'
        })
    }
}

module.exports = {
    cadastrarUsuario,
    obterPerfilUsuario,
    atualizarPerfilUsuario
}
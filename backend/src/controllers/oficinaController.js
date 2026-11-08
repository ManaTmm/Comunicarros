const db = require('../config/database')

async function cadastrarOficina(req, res) {
    let conexao
    let transacaoIniciada = false

    try {
        conexao = await db.getConnection()

        const usuarioId = req.usuario.id

        const {
            nome,
            descricao,
            cnpj,
            telefone,
            cep,
            estado,
            cidade,
            bairro,
            endereco,
            numero,
            complemento
        } = req.body

        if (!nome) {
            return res.status(400).json({
                mensagem: 'O nome da oficina é obrigatório.'
            })
        }

        await conexao.beginTransaction()
        transacaoIniciada = true

        const [resultado] = await conexao.query(
            `INSERT INTO oficinas (
                usuario_id, nome, descricao, cnpj, telefone,
                cep, estado, cidade, bairro, endereco,
                numero, complemento
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                usuarioId,
                nome,
                descricao || null,
                cnpj || null,
                telefone || null,
                cep || null,
                estado || null,
                cidade || null,
                bairro || null,
                endereco || null,
                numero || null,
                complemento || null
            ]
        )

        const oficinaId = resultado.insertId

        await conexao.query(
            'INSERT INTO estoque (oficina_id) VALUES (?)',
            [oficinaId]
        )

        await conexao.commit()
        transacaoIniciada = false

        return res.status(201).json({
            mensagem: 'Oficina cadastrada com sucesso!',
            oficina: {
                id: oficinaId,
                usuario_id: usuarioId,
                nome
            }
        })

    } catch (error) {
        if (transacaoIniciada) {
            await conexao.rollback()
        }

        console.error('Erro ao cadastrar oficina:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Este CNPJ já está cadastrado.'
            })
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar oficina.'
        })

    } finally {
        if (conexao) {
            conexao.release()
        }
    }
}

async function listarOficinas(req, res) {
    try {
        const usuarioId = req.usuario.id

        const [oficinas] = await db.query(
            `SELECT *
             FROM oficinas
             WHERE usuario_id = ?
             ORDER BY criado_em DESC`,
            [usuarioId]
        )

        return res.status(200).json({
            oficinas
        })

    } catch (error) {
        console.error('Erro ao listar oficinas:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao listar oficinas.'
        })
    }
}

module.exports = {
    cadastrarOficina,
    listarOficinas
}
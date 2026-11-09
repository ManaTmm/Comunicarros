const db = require('../config/database')

async function cadastrarServico(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId

        const {
            nome,
            descricao,
            preco,
            visivel
        } = req.body

        if (!nome || !nome.trim()) {
            return res.status(400).json({
                mensagem: 'O nome do serviço é obrigatório.'
            })
        }

        const [oficinas] = await db.query(
            `SELECT id
             FROM oficinas
             WHERE id = ? AND usuario_id = ?`,
            [oficinaId, usuarioId]
        )

        if (oficinas.length === 0) {
            return res.status(404).json({
                mensagem: 'Oficina não encontrada.'
            })
        }

        const [resultado] = await db.query(
            `INSERT INTO servicos (
                oficina_id,
                nome,
                descricao,
                preco,
                visivel
            ) VALUES (?, ?, ?, ?, ?)`,
            [
                oficinaId,
                nome.trim(),
                descricao || null,
                preco ?? null,
                visivel ?? true
            ]
        )

        return res.status(201).json({
            mensagem: 'Serviço cadastrado com sucesso!',
            servico: {
                id: resultado.insertId,
                oficina_id: oficinaId,
                nome
            }
        })

    } catch (error) {
        console.error('Erro ao cadastrar serviço:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar serviço.'
        })
    }
}

async function listarServicos(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId

        const [servicos] = await db.query(
            `SELECT s.*
             FROM servicos s
             INNER JOIN oficinas o ON o.id = s.oficina_id
             WHERE o.id = ? AND o.usuario_id = ?
             ORDER BY s.criado_em DESC`,
            [oficinaId, usuarioId]
        )

        return res.status(200).json({
            servicos
        })

    } catch (error) {
        console.error('Erro ao listar serviços:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao listar serviços.'
        })
    }
}

async function editarServico(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId
        const servicoId = req.params.servicoId

        const camposPermitidos = [
            'nome',
            'descricao',
            'preco',
            'visivel',
            'status'
        ]

        const campos = Object.keys(req.body)
            .filter(campo => camposPermitidos.includes(campo))

        if (campos.length === 0) {
            return res.status(400).json({
                mensagem: 'Nenhum campo válido foi informado.'
            })
        }

        if (
            req.body.nome !== undefined &&
            (typeof req.body.nome !== 'string' || !req.body.nome.trim())
        ) {
            return res.status(400).json({
                mensagem: 'O nome não pode ficar vazio.'
            })
        }

        const [servicos] = await db.query(
            `SELECT s.id
             FROM servicos s
             INNER JOIN oficinas o ON o.id = s.oficina_id
             WHERE s.id = ?
             AND o.id = ?
             AND o.usuario_id = ?`,
            [servicoId, oficinaId, usuarioId]
        )

        if (servicos.length === 0) {
            return res.status(404).json({
                mensagem: 'Serviço não encontrado.'
            })
        }

        const valores = campos.map(campo => {
            const valor = req.body[campo]
            return campo === 'nome' ? valor.trim() : valor
        })

        const atualizacoes = campos
            .map(campo => `${campo} = ?`)
            .join(', ')

        await db.query(
            `UPDATE servicos
             SET ${atualizacoes}
             WHERE id = ?`,
            [...valores, servicoId]
        )

        return res.status(200).json({
            mensagem: 'Serviço atualizado com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao editar serviço:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao editar serviço.'
        })
    }
}

async function excluirServico(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId
        const servicoId = req.params.servicoId

        const [resultado] = await db.query(
            `DELETE s
             FROM servicos s
             INNER JOIN oficinas o ON o.id = s.oficina_id
             WHERE s.id = ?
             AND o.id = ?
             AND o.usuario_id = ?`,
            [servicoId, oficinaId, usuarioId]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Serviço não encontrado.'
            })
        }

        return res.status(200).json({
            mensagem: 'Serviço excluído com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao excluir serviço:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir serviço.'
        })
    }
}

module.exports = {
    cadastrarServico,
    listarServicos,
    editarServico,
    excluirServico
}
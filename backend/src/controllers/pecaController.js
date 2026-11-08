const db = require('../config/database')

async function cadastrarPeca(req, res) {
    let conexao
    let transacaoIniciada = false

    try {
        conexao = await db.getConnection()

        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId

        const {
            nome,
            descricao,
            marca,
            modelo,
            ano,
            lado,
            posicao,
            tipo,
            estado_conservacao,
            quantidade,
            preco,
            visivel
        } = req.body

        if (!nome || !estado_conservacao) {
            return res.status(400).json({
                mensagem: 'Nome e estado de conservação são obrigatórios.'
            })
        }

        await conexao.beginTransaction()
        transacaoIniciada = true

        const [estoques] = await conexao.query(
            `SELECT e.id
             FROM estoque e
             INNER JOIN oficinas o ON o.id = e.oficina_id
             WHERE o.id = ? AND o.usuario_id = ?
             FOR UPDATE`,
            [oficinaId, usuarioId]
        )

        if (estoques.length === 0) {
            await conexao.rollback()
            transacaoIniciada = false

            return res.status(404).json({
                mensagem: 'Oficina não encontrada ou sem estoque.'
            })
        }

        const estoqueId = estoques[0].id

        const [ids] = await conexao.query(
            `SELECT COALESCE(MAX(id_local), 0) + 1 AS proximo_id
             FROM pecas
             WHERE estoque_id = ?`,
            [estoqueId]
        )

        const idLocal = ids[0].proximo_id

        const [resultado] = await conexao.query(
            `INSERT INTO pecas (
                estoque_id,
                id_local,
                nome,
                descricao,
                marca,
                modelo,
                ano,
                lado,
                posicao,
                tipo,
                estado_conservacao,
                quantidade,
                preco,
                visivel
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                estoqueId,
                idLocal,
                nome,
                descricao || null,
                marca || null,
                modelo || null,
                ano || null,
                lado || null,
                posicao || null,
                tipo || null,
                estado_conservacao,
                quantidade ?? 1,
                preco ?? null,
                visivel ?? true
            ]
        )

        await conexao.commit()
        transacaoIniciada = false

        return res.status(201).json({
            mensagem: 'Peça cadastrada com sucesso!',
            peca: {
                id: resultado.insertId,
                id_local: idLocal,
                estoque_id: estoqueId,
                nome
            }
        })

    } catch (error) {
        if (transacaoIniciada) {
            await conexao.rollback()
        }

        console.error('Erro ao cadastrar peça:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao cadastrar peça.'
        })

    } finally {
        if (conexao) {
            conexao.release()
        }
    }
}

async function listarPecas(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId

        const [pecas] = await db.query(
            `SELECT p.*
             FROM pecas p
             INNER JOIN estoque e ON e.id = p.estoque_id
             INNER JOIN oficinas o ON o.id = e.oficina_id
             WHERE o.id = ? AND o.usuario_id = ?
             ORDER BY p.criado_em DESC`,
            [oficinaId, usuarioId]
        )

        return res.status(200).json({
            pecas
        })

    } catch (error) {
        console.error('Erro ao listar peças:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao listar peças.'
        })
    }
}

async function editarPeca(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId
        const pecaId = req.params.pecaId

        const camposPermitidos = [
            'nome',
            'descricao',
            'marca',
            'modelo',
            'ano',
            'lado',
            'posicao',
            'tipo',
            'estado_conservacao',
            'quantidade',
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
            !req.body.nome.trim()
        ) {
            return res.status(400).json({
                mensagem: 'O nome não pode ficar vazio.'
            })
        }

        if (
            req.body.estado_conservacao !== undefined &&
            !req.body.estado_conservacao
        ) {
            return res.status(400).json({
                mensagem: 'O estado de conservação não pode ficar vazio.'
            })
        }

        const [pecas] = await db.query(
            `SELECT p.id
             FROM pecas p
             INNER JOIN estoque e ON e.id = p.estoque_id
             INNER JOIN oficinas o ON o.id = e.oficina_id
             WHERE p.id = ?
             AND o.id = ?
             AND o.usuario_id = ?`,
            [pecaId, oficinaId, usuarioId]
        )

        if (pecas.length === 0) {
            return res.status(404).json({
                mensagem: 'Peça não encontrada.'
            })
        }

        const valores = campos.map(campo => req.body[campo])

        const atualizacoes = campos
            .map(campo => `${campo} = ?`)
            .join(', ')

        await db.query(
            `UPDATE pecas
             SET ${atualizacoes}
             WHERE id = ?`,
            [...valores, pecaId]
        )

        return res.status(200).json({
            mensagem: 'Peça atualizada com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao editar peça:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao editar peça.'
        })
    }
}

async function excluirPeca(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId
        const pecaId = req.params.pecaId

        const [resultado] = await db.query(
            `DELETE p
             FROM pecas p
             INNER JOIN estoque e ON e.id = p.estoque_id
             INNER JOIN oficinas o ON o.id = e.oficina_id
             WHERE p.id = ?
             AND o.id = ?
             AND o.usuario_id = ?`,
            [pecaId, oficinaId, usuarioId]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Peça não encontrada.'
            })
        }

        return res.status(200).json({
            mensagem: 'Peça excluída com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao excluir peça:', error)

        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({
                mensagem: 'Não é possível excluir a peça enquanto existirem fotos vinculadas.'
            })
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao excluir peça.'
        })
    }
}

module.exports = {
    cadastrarPeca,
    listarPecas,
    editarPeca,
    excluirPeca
}
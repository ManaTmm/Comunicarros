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

async function consultarOficinasPublicas(oficinaId) {
    const filtroId = oficinaId === undefined ? '' : 'WHERE o.id = ?'
    const parametros = oficinaId === undefined ? [] : [oficinaId]

    const [oficinas] = await db.query(
        `SELECT o.id, o.nome, o.descricao, o.telefone, o.cep,
                o.estado, o.cidade, o.bairro, o.endereco, o.numero,
                o.complemento
         FROM oficinas o
         ${filtroId}
         ORDER BY o.criado_em DESC`,
        parametros
    )

    if (oficinas.length === 0) {
        return oficinas
    }

    const ids = oficinas.map(oficina => oficina.id)
    const placeholders = ids.map(() => '?').join(', ')

    const [pecas] = await db.query(
        `SELECT e.oficina_id, p.id, p.nome, p.marca, p.modelo, p.ano,
                p.estado_conservacao, p.preco, p.quantidade
         FROM pecas p
         INNER JOIN estoque e ON e.id = p.estoque_id
         WHERE e.oficina_id IN (${placeholders})
         AND p.visivel = TRUE
         AND p.status = 'disponivel'
         AND p.quantidade > 0
         ORDER BY p.criado_em DESC`,
        ids
    )

    const [servicos] = await db.query(
        `SELECT s.oficina_id, s.id, s.nome, s.descricao, s.preco
         FROM servicos s
         WHERE s.oficina_id IN (${placeholders})
         AND s.visivel = TRUE
         AND s.status = 'ativo'
         ORDER BY s.criado_em DESC`,
        ids
    )

    return oficinas.map(oficina => ({
        ...oficina,
        pecas: pecas.filter(peca => peca.oficina_id === oficina.id),
        servicos: servicos.filter(servico => servico.oficina_id === oficina.id)
    }))
}

async function listarOficinasPublicas(req, res) {
    try {
        const oficinas = await consultarOficinasPublicas()

        return res.status(200).json({ oficinas })
    } catch (error) {
        console.error('Erro ao listar oficinas públicas:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao listar oficinas.'
        })
    }
}

async function obterOficinaPublica(req, res) {
    const oficinaId = Number(req.params.oficinaId)

    if (!Number.isInteger(oficinaId) || oficinaId < 1) {
        return res.status(400).json({
            mensagem: 'Identificador de oficina inválido.'
        })
    }

    try {
        const oficinas = await consultarOficinasPublicas(oficinaId)

        if (oficinas.length === 0) {
            return res.status(404).json({
                mensagem: 'Oficina não encontrada.'
            })
        }

        return res.status(200).json({ oficina: oficinas[0] })
    } catch (error) {
        console.error('Erro ao consultar oficina pública:', error)

        return res.status(500).json({
            mensagem: 'Erro interno ao carregar a oficina.'
        })
    }
}

async function editarOficina(req, res) {
    try {
        const usuarioId = req.usuario.id
        const oficinaId = req.params.oficinaId

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

        const [resultado] = await db.query(
            `UPDATE oficinas
             SET nome = ?,
                 descricao = ?,
                 cnpj = ?,
                 telefone = ?,
                 cep = ?,
                 estado = ?,
                 cidade = ?,
                 bairro = ?,
                 endereco = ?,
                 numero = ?,
                 complemento = ?
             WHERE id = ? AND usuario_id = ?`,
            [
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
                complemento || null,
                oficinaId,
                usuarioId
            ]
        )

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensagem: 'Oficina não encontrada.'
            })
        }

        return res.status(200).json({
            mensagem: 'Oficina atualizada com sucesso!'
        })

    } catch (error) {
        console.error('Erro ao editar oficina:', error)

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                mensagem: 'Este CNPJ já está cadastrado.'
            })
        }

        return res.status(500).json({
            mensagem: 'Erro interno ao editar oficina.'
        })
    }
}

module.exports = {
    cadastrarOficina,
    listarOficinas,
    editarOficina,
    listarOficinasPublicas,
    obterOficinaPublica
}
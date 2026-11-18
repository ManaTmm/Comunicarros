import { useState } from 'react'

function Servicos() {
  const [servicos, setServicos] = useState([
    {
      id: 1,
      nome: 'Pintura automotiva',
      descricao: 'Pintura completa ou parcial de veículos.',
      preco: 1500,
      visivel: true,
    },
    {
      id: 2,
      nome: 'Martelinho de ouro',
      descricao: 'Reparação de pequenos amassados sem pintura.',
      preco: 250,
      visivel: true,
    },
    {
      id: 3,
      nome: 'Polimento',
      descricao: 'Polimento técnico e revitalização da pintura.',
      preco: 180,
      visivel: false,
    },
  ])

  const [pesquisa, setPesquisa] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [servicoEditando, setServicoEditando] = useState(null)

  const [formulario, setFormulario] = useState({
    nome: '',
    descricao: '',
    preco: '',
    visivel: true,
  })

  function abrirCadastro() {
    setServicoEditando(null)

    setFormulario({
      nome: '',
      descricao: '',
      preco: '',
      visivel: true,
    })

    setModalAberto(true)
  }

  function abrirEdicao(servico) {
    setServicoEditando(servico)

    setFormulario({
      nome: servico.nome,
      descricao: servico.descricao,
      preco: servico.preco,
      visivel: servico.visivel,
    })

    setModalAberto(true)
  }

  function atualizarFormulario(event) {
    const { name, value, type, checked } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function salvarServico(event) {
    event.preventDefault()

    if (!formulario.nome.trim()) {
      alert('Informe o nome do serviço.')
      return
    }

    const novoServico = {
      ...formulario,
      nome: formulario.nome.trim(),
      preco: Number(formulario.preco) || 0,
    }

    if (servicoEditando) {
      setServicos((anteriores) =>
        anteriores.map((servico) =>
          servico.id === servicoEditando.id
            ? { ...servico, ...novoServico }
            : servico
        )
      )
    } else {
      setServicos((anteriores) => [
        ...anteriores,
        {
          id: Date.now(),
          ...novoServico,
        },
      ])
    }

    setModalAberto(false)
  }

  function excluirServico(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este serviço?'
    )

    if (!confirmar) return

    setServicos((anteriores) =>
      anteriores.filter((servico) => servico.id !== id)
    )
  }

  function alternarVisibilidade(id) {
    setServicos((anteriores) =>
      anteriores.map((servico) =>
        servico.id === id
          ? { ...servico, visivel: !servico.visivel }
          : servico
      )
    )
  }

  const servicosFiltrados = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

  function formatarPreco(valor) {
    if (!valor) return 'A combinar'

    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">GERENCIAMENTO</span>
          <h1>Serviços</h1>
          <p className="text-secondary">
            Gerencie os serviços oferecidos pela sua oficina.
          </p>
        </div>

        <button className="btn btn-danger" onClick={abrirCadastro}>
          + Novo serviço
        </button>
      </div>

      <div className="dashboard-section-header">
        <h4>Seus serviços</h4>
        <span>{servicos.length} cadastrados</span>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar serviço..."
              value={pesquisa}
              onChange={(event) => setPesquisa(event.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Serviço</th>
                  <th>Preço</th>
                  <th>Visibilidade</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>

              <tbody>
                {servicosFiltrados.map((servico) => (
                  <tr key={servico.id}>
                    <td>
                      <strong>{servico.nome}</strong>
                      <div className="text-secondary small">
                        {servico.descricao}
                      </div>
                    </td>

                    <td>{formatarPreco(servico.preco)}</td>

                    <td>
                      <span
                        className={`badge ${
                          servico.visivel
                            ? 'bg-success'
                            : 'bg-secondary'
                        }`}
                      >
                        {servico.visivel ? 'Visível' : 'Oculto'}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => alternarVisibilidade(servico.id)}
                          title="Alterar visibilidade"
                        >
                          {servico.visivel ? 'Ocultar' : 'Exibir'}
                        </button>

                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => abrirEdicao(servico)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => excluirServico(servico.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {servicosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-5">
                      <p className="text-secondary mb-0">
                        Nenhum serviço encontrado.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalAberto && (
        <div className="modal-backdrop-custom">
          <div className="modal-content-custom">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">
                {servicoEditando ? 'Editar serviço' : 'Novo serviço'}
              </h4>

              <button
                className="btn-close"
                onClick={() => setModalAberto(false)}
              />
            </div>

            <form onSubmit={salvarServico}>
              <div className="mb-3">
                <label className="form-label">Nome do serviço</label>
                <input
                  type="text"
                  name="nome"
                  className="form-control"
                  placeholder="Ex.: Pintura automotiva"
                  value={formulario.nome}
                  onChange={atualizarFormulario}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <textarea
                  name="descricao"
                  className="form-control"
                  rows="3"
                  placeholder="Descreva o serviço oferecido..."
                  value={formulario.descricao}
                  onChange={atualizarFormulario}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Preço (R$)</label>
                <input
                  type="number"
                  name="preco"
                  className="form-control"
                  placeholder="Ex.: 250"
                  min="0"
                  step="0.01"
                  value={formulario.preco}
                  onChange={atualizarFormulario}
                />

                <small className="text-secondary">
                  Deixe em branco ou informe zero para exibir como "A combinar".
                </small>
              </div>

              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  name="visivel"
                  id="visivel"
                  className="form-check-input"
                  checked={formulario.visivel}
                  onChange={atualizarFormulario}
                />

                <label className="form-check-label" htmlFor="visivel">
                  Exibir serviço no catálogo público
                </label>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="btn btn-danger">
                  {servicoEditando ? 'Salvar alterações' : 'Cadastrar serviço'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Servicos
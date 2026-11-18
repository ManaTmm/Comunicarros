import { useState } from 'react'

const pecasIniciais = [
  {
    id: 1,
    nome: 'Farol dianteiro',
    marca: 'Volkswagen',
    modelo: 'Gol G5',
    ano: '2009-2012',
    lado: 'Esquerdo',
    posicao: 'Dianteiro',
    tipo: 'Original',
    estado_conservacao: 'Usado',
    quantidade: 2,
    preco: 180,
    visivel: true
  },
  {
    id: 2,
    nome: 'Retrovisor elétrico',
    marca: 'Chevrolet',
    modelo: 'Onix',
    ano: '2017-2019',
    lado: 'Direito',
    posicao: 'Lateral',
    tipo: 'Original',
    estado_conservacao: 'Usado',
    quantidade: 1,
    preco: 250,
    visivel: true
  },
  {
    id: 3,
    nome: 'Para-choque dianteiro',
    marca: 'Fiat',
    modelo: 'Uno',
    ano: '2010-2014',
    lado: 'Não se aplica',
    posicao: 'Dianteiro',
    tipo: 'Paralelo',
    estado_conservacao: 'Novo',
    quantidade: 3,
    preco: 320,
    visivel: false
  }
]

const formularioInicial = {
  nome: '',
  descricao: '',
  marca: '',
  modelo: '',
  ano: '',
  lado: 'Não se aplica',
  posicao: 'Não se aplica',
  tipo: 'Original',
  estado_conservacao: 'Usado',
  quantidade: 1,
  preco: '',
  visivel: true
}

function Estoque() {
  const [pecas, setPecas] = useState(pecasIniciais)

  const [pesquisa, setPesquisa] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [filtroVisibilidade, setFiltroVisibilidade] = useState('Todos')

  const [modalAberto, setModalAberto] = useState(false)
  const [pecaEditando, setPecaEditando] = useState(null)

  const [formulario, setFormulario] = useState(formularioInicial)

  const pecasFiltradas = pecas.filter((peca) => {
    const termo = pesquisa.toLowerCase()

    const correspondePesquisa =
      peca.nome.toLowerCase().includes(termo) ||
      peca.marca.toLowerCase().includes(termo) ||
      peca.modelo.toLowerCase().includes(termo)

    const correspondeEstado =
      filtroEstado === 'Todos' ||
      peca.estado_conservacao === filtroEstado

    const correspondeVisibilidade =
      filtroVisibilidade === 'Todos' ||
      (filtroVisibilidade === 'Visíveis' && peca.visivel) ||
      (filtroVisibilidade === 'Ocultas' && !peca.visivel)

    return (
      correspondePesquisa &&
      correspondeEstado &&
      correspondeVisibilidade
    )
  })

  const totalPecas = pecas.reduce(
    (total, peca) => total + Number(peca.quantidade),
    0
  )

  const pecasVisiveis = pecas.filter(
    (peca) => peca.visivel
  ).length

  const pecasOcultas = pecas.filter(
    (peca) => !peca.visivel
  ).length

  const valorEstoque = pecas.reduce(
    (total, peca) =>
      total + Number(peca.preco || 0) * Number(peca.quantidade),
    0
  )

  const formatarPreco = (valor) => {
    return Number(valor).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function atualizarCampo(e) {
    const { name, value, type, checked } = e.target

    setFormulario({
      ...formulario,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  function abrirCadastro() {
    setPecaEditando(null)
    setFormulario(formularioInicial)
    setModalAberto(true)
  }

  function abrirEdicao(peca) {
    setPecaEditando(peca.id)

    setFormulario({
      ...peca,
      preco: peca.preco ?? ''
    })

    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setPecaEditando(null)
    setFormulario(formularioInicial)
  }

  function salvarPeca(e) {
    e.preventDefault()

    const novaPeca = {
      ...formulario,
      quantidade: Number(formulario.quantidade),
      preco: formulario.preco === '' ? null : Number(formulario.preco)
    }

    if (pecaEditando !== null) {
      setPecas((lista) =>
        lista.map((peca) =>
          peca.id === pecaEditando
            ? { ...peca, ...novaPeca }
            : peca
        )
      )
    } else {
      setPecas((lista) => [
        ...lista,
        {
          id: Date.now(),
          ...novaPeca
        }
      ])
    }

    fecharModal()
  }

  function excluirPeca(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta peça?'
    )

    if (!confirmar) return

    setPecas((lista) =>
      lista.filter((peca) => peca.id !== id)
    )
  }

  function alternarVisibilidade(id) {
    setPecas((lista) =>
      lista.map((peca) =>
        peca.id === id
          ? { ...peca, visivel: !peca.visivel }
          : peca
      )
    )
  }

  return (
    <div>

      {/* Cabeçalho */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">
            GERENCIAMENTO
          </span>

          <h1>Estoque</h1>

          <p className="text-secondary">
            Gerencie as peças disponíveis na sua oficina.
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={abrirCadastro}
        >
          + Adicionar peça
        </button>
      </div>

      {/* Indicadores */}
      <div className="row g-3 mb-4">

        <div className="col-md-6 col-xl-3">
          <div className="dashboard-stat">
            <span className="stat-icon">▤</span>
            <p>Quantidade em estoque</p>
            <h3>{totalPecas}</h3>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="dashboard-stat">
            <span className="stat-icon">✓</span>
            <p>Peças anunciadas</p>
            <h3>{pecasVisiveis}</h3>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="dashboard-stat">
            <span className="stat-icon">◉</span>
            <p>Peças ocultas</p>
            <h3>{pecasOcultas}</h3>
          </div>
        </div>

        <div className="col-md-6 col-xl-3">
          <div className="dashboard-stat">
            <span className="stat-icon">R$</span>
            <p>Valor estimado do estoque</p>
            <h3 className="fs-4">
              {formatarPreco(valorEstoque)}
            </h3>
          </div>
        </div>

      </div>

      {/* Tabela */}
      <div className="estoque-container">

        <div className="estoque-header">
          <div>
            <h4>Peças cadastradas</h4>
            <p className="text-secondary mb-0">
              Consulte e gerencie seus produtos.
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="row g-3 p-3">

          <div className="col-lg-6">
            <input
              type="text"
              className="form-control"
              placeholder="Pesquisar por peça, marca ou modelo..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>

          <div className="col-md-6 col-lg-3">
            <select
              className="form-select"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos">Todos os estados</option>
              <option value="Novo">Novo</option>
              <option value="Usado">Usado</option>
              <option value="Recuperado">Recuperado</option>
            </select>
          </div>

          <div className="col-md-6 col-lg-3">
            <select
              className="form-select"
              value={filtroVisibilidade}
              onChange={(e) => setFiltroVisibilidade(e.target.value)}
            >
              <option value="Todos">Todas as peças</option>
              <option value="Visíveis">Visíveis</option>
              <option value="Ocultas">Ocultas</option>
            </select>
          </div>

        </div>

        {/* Conteúdo da tabela */}
        <div className="table-responsive">

          <table className="table estoque-table align-middle mb-0">

            <thead>
              <tr>
                <th>Peça</th>
                <th>Veículo</th>
                <th>Conservação</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th>Visibilidade</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              {pecasFiltradas.length > 0 ? (

                pecasFiltradas.map((peca) => (

                  <tr key={peca.id}>

                    <td>
                      <strong>{peca.nome}</strong>

                      <small className="d-block text-secondary">
                        {peca.marca} · {peca.tipo}
                      </small>
                    </td>

                    <td>
                      {peca.modelo}

                      <small className="d-block text-secondary">
                        {peca.ano}
                      </small>
                    </td>

                    <td>
                      <span className="estoque-badge">
                        {peca.estado_conservacao}
                      </span>
                    </td>

                    <td>{peca.quantidade}</td>

                    <td>
                      {peca.preco !== null
                        ? formatarPreco(peca.preco)
                        : 'A combinar'}
                    </td>

                    <td>
                      <span
                        className={`estoque-status ${
                          peca.visivel ? 'visivel' : 'oculto'
                        }`}
                      >
                        {peca.visivel ? 'Anunciada' : 'Oculta'}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          title="Editar peça"
                          onClick={() => abrirEdicao(peca)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Excluir peça"
                          onClick={() => excluirPeca(peca.id)}
                        >
                          Excluir
                        </button>

                        <button
                          className="btn btn-sm btn-outline-secondary"
                          title="Alterar visibilidade"
                          onClick={() => alternarVisibilidade(peca.id)}
                        >
                          {peca.visivel ? 'Ocultar' : 'Anunciar'}
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <h5>Nenhuma peça encontrada.</h5>

                    <p className="text-secondary mb-0">
                      Tente alterar os filtros ou cadastre uma nova peça.
                    </p>
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

        <div className="estoque-footer">
          Exibindo {pecasFiltradas.length} de {pecas.length} peças cadastradas.
        </div>

      </div>

      {/* Modal de cadastro e edição */}
      {modalAberto && (

        <div className="modal-overlay" onClick={fecharModal}>

          <div
            className="estoque-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="estoque-modal-header">

              <div>
                <span className="dashboard-greeting">
                  ESTOQUE
                </span>

                <h4>
                  {pecaEditando ? 'Editar peça' : 'Adicionar peça'}
                </h4>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={fecharModal}
              >
                ×
              </button>

            </div>

            <form onSubmit={salvarPeca}>

              <div className="row g-3">

                <div className="col-md-8">
                  <label className="form-label">Nome da peça *</label>

                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={formulario.nome}
                    onChange={atualizarCampo}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Marca</label>

                  <input
                    type="text"
                    name="marca"
                    className="form-control"
                    value={formulario.marca}
                    onChange={atualizarCampo}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Modelo do veículo</label>

                  <input
                    type="text"
                    name="modelo"
                    className="form-control"
                    value={formulario.modelo}
                    onChange={atualizarCampo}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Ano</label>

                  <input
                    type="text"
                    name="ano"
                    className="form-control"
                    placeholder="Ex: 2015-2018"
                    value={formulario.ano}
                    onChange={atualizarCampo}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Lado</label>

                  <select
                    name="lado"
                    className="form-select"
                    value={formulario.lado}
                    onChange={atualizarCampo}
                  >
                    <option>Não se aplica</option>
                    <option>Esquerdo</option>
                    <option>Direito</option>
                    <option>Ambos</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Posição</label>

                  <select
                    name="posicao"
                    className="form-select"
                    value={formulario.posicao}
                    onChange={atualizarCampo}
                  >
                    <option>Não se aplica</option>
                    <option>Dianteiro</option>
                    <option>Traseiro</option>
                    <option>Lateral</option>
                    <option>Interno</option>
                    <option>Motor</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Tipo</label>

                  <select
                    name="tipo"
                    className="form-select"
                    value={formulario.tipo}
                    onChange={atualizarCampo}
                  >
                    <option>Original</option>
                    <option>Paralelo</option>
                    <option>Recondicionado</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Estado de conservação *
                  </label>

                  <select
                    name="estado_conservacao"
                    className="form-select"
                    value={formulario.estado_conservacao}
                    onChange={atualizarCampo}
                    required
                  >
                    <option>Novo</option>
                    <option>Usado</option>
                    <option>Recuperado</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Quantidade *</label>

                  <input
                    type="number"
                    name="quantidade"
                    className="form-control"
                    min="1"
                    value={formulario.quantidade}
                    onChange={atualizarCampo}
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Preço (R$)</label>

                  <input
                    type="number"
                    name="preco"
                    className="form-control"
                    min="0"
                    step="0.01"
                    value={formulario.preco}
                    onChange={atualizarCampo}
                    placeholder="Deixe vazio para negociar"
                  />
                </div>

                <div className="col-md-12">
                  <label className="form-label">Descrição</label>

                  <textarea
                    name="descricao"
                    className="form-control"
                    rows="3"
                    value={formulario.descricao}
                    onChange={atualizarCampo}
                    placeholder="Informações adicionais sobre a peça..."
                  />
                </div>

                <div className="col-md-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="visivel"
                      id="visivel"
                      className="form-check-input"
                      checked={formulario.visivel}
                      onChange={atualizarCampo}
                    />

                    <label className="form-check-label" htmlFor="visivel">
                      Disponibilizar peça no catálogo público
                    </label>
                  </div>
                </div>

              </div>

              <div className="estoque-modal-footer">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn btn-danger"
                >
                  {pecaEditando ? 'Salvar alterações' : 'Cadastrar peça'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Estoque
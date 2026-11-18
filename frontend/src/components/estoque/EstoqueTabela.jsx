function EstoqueTabela({
  pecas,
  totalPecas,
  carregando,
  pesquisa,
  filtroEstado,
  filtroVisibilidade,
  onPesquisaChange,
  onFiltroEstadoChange,
  onFiltroVisibilidadeChange,
  onEditar,
  onExcluir,
  onAlternarVisibilidade,
  formatarPreco,
  salvando
}) {
  return (
    <div className="estoque-container">
      <div className="estoque-header">
        <div>
          <h4>Peças cadastradas</h4>
          <p className="text-secondary mb-0">
            Consulte e gerencie seus produtos.
          </p>
        </div>
      </div>

      <div className="row g-3 p-3">
        <div className="col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar por peça, marca ou modelo..."
            value={pesquisa}
            onChange={(evento) => onPesquisaChange(evento.target.value)}
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <select
            className="form-select"
            value={filtroEstado}
            onChange={(evento) => onFiltroEstadoChange(evento.target.value)}
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
            onChange={(evento) => onFiltroVisibilidadeChange(evento.target.value)}
          >
            <option value="Todos">Todas as peças</option>
            <option value="Visíveis">Visíveis</option>
            <option value="Ocultas">Ocultas</option>
          </select>
        </div>
      </div>

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
            {pecas.length > 0 ? (
              pecas.map((peca) => (
                <tr key={peca.id}>
                  <td>
                    <strong>{peca.nome}</strong>
                    <small className="d-block text-secondary">
                      {peca.marca} · {peca.tipo}
                    </small>
                  </td>
                  <td>
                    {peca.modelo}
                    <small className="d-block text-secondary">{peca.ano}</small>
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
                        onClick={() => onEditar(peca)}
                        disabled={salvando}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        title="Excluir peça"
                        onClick={() => onExcluir(peca.id)}
                        disabled={salvando}
                      >
                        Excluir
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        title="Alterar visibilidade"
                        onClick={() => onAlternarVisibilidade(peca.id)}
                        disabled={salvando}
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
                  <h5>
                    {carregando
                      ? 'Carregando peças...'
                      : 'Nenhuma peça encontrada.'}
                  </h5>
                  {!carregando && (
                    <p className="text-secondary mb-0">
                      Tente alterar os filtros ou cadastre uma nova peça.
                    </p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="estoque-footer">
        Exibindo {pecas.length} de {totalPecas} peças cadastradas.
      </div>
    </div>
  )
}

export default EstoqueTabela

function ServicosTabela({
  servicos,
  pesquisa,
  onPesquisaChange,
  onAlternarVisibilidade,
  onEditar,
  onExcluir,
  formatarPreco,
  carregando,
  salvando
}) {
  const servicosFiltrados = servicos.filter((servico) =>
    servico.nome.toLowerCase().includes(pesquisa.toLowerCase())
  )

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body">
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Pesquisar serviço..."
            value={pesquisa}
            onChange={(evento) => onPesquisaChange(evento.target.value)}
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
                        servico.visivel ? 'bg-success' : 'bg-secondary'
                      }`}
                    >
                      {servico.visivel ? 'Visível' : 'Oculto'}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => onAlternarVisibilidade(servico.id)}
                        title="Alterar visibilidade"
                        disabled={salvando}
                      >
                        {servico.visivel ? 'Ocultar' : 'Exibir'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onEditar(servico)}
                        disabled={salvando}
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onExcluir(servico.id)}
                        disabled={salvando}
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
                      {carregando
                        ? 'Carregando serviços...'
                        : 'Nenhum serviço encontrado.'}
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ServicosTabela

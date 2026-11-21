function ServicosCabecalho({
  quantidade,
  carregando,
  oficinaId,
  salvando,
  erro,
  onNovo
}) {
  return (
    <>
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">GERENCIAMENTO</span>
          <h1>Serviços</h1>
          <p className="text-secondary">
            Gerencie os serviços oferecidos pela sua oficina.
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={onNovo}
          disabled={carregando || oficinaId === null || salvando}
        >
          + Novo serviço
        </button>
      </div>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}
      {carregando && <p role="status">Carregando serviços...</p>}

      <div className="dashboard-section-header">
        <h4>Seus serviços</h4>
        <span>{quantidade} cadastrados</span>
      </div>
    </>
  )
}

export default ServicosCabecalho

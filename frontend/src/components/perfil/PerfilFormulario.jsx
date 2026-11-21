function PerfilFormulario({
  formulario,
  mensagem,
  erro,
  salvando,
  onCampoChange,
  onSubmit
}) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h4 className="mb-1">Informações pessoais</h4>
        <p className="text-secondary mb-4">
          Mantenha seus dados sempre atualizados.
        </p>

        {mensagem && (
          <div className="alert alert-success" role="status">
            {mensagem}
          </div>
        )}
        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="perfil-nome">
              Nome completo
            </label>
            <input
              id="perfil-nome"
              type="text"
              name="nome"
              className="form-control"
              value={formulario.nome}
              onChange={onCampoChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="perfil-email">
              E-mail
            </label>
            <input
              id="perfil-email"
              type="email"
              name="email"
              className="form-control"
              value={formulario.email}
              onChange={onCampoChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" htmlFor="perfil-telefone">
              Telefone
            </label>
            <input
              id="perfil-telefone"
              type="tel"
              name="telefone"
              className="form-control"
              placeholder="(00) 00000-0000"
              value={formulario.telefone}
              onChange={onCampoChange}
            />
          </div>

          <button type="submit" className="btn btn-danger" disabled={salvando}>
            {salvando ? 'Salvando...' : 'Salvar alterações'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PerfilFormulario

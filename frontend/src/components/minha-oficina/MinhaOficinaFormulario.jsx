function MinhaOficinaFormulario({
  formulario,
  oficinaId,
  erro,
  salvando,
  onCampoChange,
  onSubmit,
  onCancelar
}) {
  return (
    <>
      <div className="dashboard-welcome mb-4">
        <div>
          <h2>Apresente sua oficina</h2>
          <p>
            Essas informações serão utilizadas para identificar seu negócio e
            permitir que clientes encontrem você no Comunicarros.
          </p>
        </div>
        <div className="dashboard-welcome-icon">⚙</div>
      </div>

      <form onSubmit={onSubmit}>
        <div className="dashboard-stat mb-4">
          <h4 className="mb-4">Informações principais</h4>
          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label" htmlFor="oficina-nome">
                Nome da oficina *
              </label>
              <input
                id="oficina-nome"
                type="text"
                name="nome"
                className="form-control"
                value={formulario.nome}
                onChange={onCampoChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="oficina-cnpj">CNPJ</label>
              <input
                id="oficina-cnpj"
                type="text"
                name="cnpj"
                className="form-control"
                value={formulario.cnpj}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="oficina-descricao">
                Descrição
              </label>
              <textarea
                id="oficina-descricao"
                name="descricao"
                className="form-control"
                rows="4"
                value={formulario.descricao}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="oficina-telefone">
                Telefone / WhatsApp
              </label>
              <input
                id="oficina-telefone"
                type="tel"
                name="telefone"
                className="form-control"
                value={formulario.telefone}
                onChange={onCampoChange}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-stat mb-4">
          <h4 className="mb-4">Endereço</h4>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label" htmlFor="oficina-cep">CEP</label>
              <input
                id="oficina-cep"
                type="text"
                name="cep"
                className="form-control"
                value={formulario.cep}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label" htmlFor="oficina-estado">
                Estado
              </label>
              <input
                id="oficina-estado"
                type="text"
                name="estado"
                className="form-control"
                value={formulario.estado}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="oficina-cidade">
                Cidade
              </label>
              <input
                id="oficina-cidade"
                type="text"
                name="cidade"
                className="form-control"
                value={formulario.cidade}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label" htmlFor="oficina-bairro">
                Bairro
              </label>
              <input
                id="oficina-bairro"
                type="text"
                name="bairro"
                className="form-control"
                value={formulario.bairro}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-8">
              <label className="form-label" htmlFor="oficina-endereco">
                Rua / Avenida
              </label>
              <input
                id="oficina-endereco"
                type="text"
                name="endereco"
                className="form-control"
                value={formulario.endereco}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label" htmlFor="oficina-numero">
                Número
              </label>
              <input
                id="oficina-numero"
                type="text"
                name="numero"
                className="form-control"
                value={formulario.numero}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label" htmlFor="oficina-complemento">
                Complemento
              </label>
              <input
                id="oficina-complemento"
                type="text"
                name="complemento"
                className="form-control"
                value={formulario.complemento}
                onChange={onCampoChange}
              />
            </div>
          </div>
        </div>

        {erro && (
          <div className="alert alert-danger" role="alert">
            {erro}
          </div>
        )}

        <div className="d-flex gap-2 mb-5">
          <button
            type="submit"
            className="btn btn-danger"
            disabled={salvando}
          >
            {salvando
              ? 'Salvando...'
              : oficinaId
                ? 'Salvar alterações'
                : 'Cadastrar oficina'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancelar}
            disabled={salvando}
          >
            Cancelar
          </button>
        </div>
      </form>
    </>
  )
}

export default MinhaOficinaFormulario

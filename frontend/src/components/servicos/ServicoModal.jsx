function ServicoModal({
  aberto,
  servicoEditando,
  formulario,
  erro,
  salvando,
  onCampoChange,
  onSalvar,
  onFechar
}) {
  if (!aberto) return null

  return (
    <div className="modal-backdrop-custom" onClick={onFechar}>
      <div
        className="modal-content-custom"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            {servicoEditando ? 'Editar serviço' : 'Novo serviço'}
          </h4>

          <button
            type="button"
            className="btn-close"
            onClick={onFechar}
            aria-label="Fechar"
            disabled={salvando}
          />
        </div>

        <form onSubmit={onSalvar}>
          {erro && (
            <div className="alert alert-danger" role="alert">
              {erro}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" htmlFor="servico-nome">
              Nome do serviço
            </label>
            <input
              id="servico-nome"
              type="text"
              name="nome"
              className="form-control"
              placeholder="Ex.: Pintura automotiva"
              value={formulario.nome}
              onChange={onCampoChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="servico-descricao">
              Descrição
            </label>
            <textarea
              id="servico-descricao"
              name="descricao"
              className="form-control"
              rows="3"
              placeholder="Descreva o serviço oferecido..."
              value={formulario.descricao}
              onChange={onCampoChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="servico-preco">
              Preço (R$)
            </label>
            <input
              id="servico-preco"
              type="number"
              name="preco"
              className="form-control"
              placeholder="Ex.: 250"
              min="0"
              step="0.01"
              value={formulario.preco}
              onChange={onCampoChange}
            />
            <small className="text-secondary">
              Deixe em branco ou informe zero para exibir como "A combinar".
            </small>
          </div>

          <div className="form-check mb-4">
            <input
              type="checkbox"
              name="visivel"
              id="servico-visivel"
              className="form-check-input"
              checked={formulario.visivel}
              onChange={onCampoChange}
            />
            <label className="form-check-label" htmlFor="servico-visivel">
              Exibir serviço no catálogo público
            </label>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onFechar}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-danger" disabled={salvando}>
              {salvando
                ? 'Salvando...'
                : servicoEditando
                  ? 'Salvar alterações'
                  : 'Cadastrar serviço'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ServicoModal

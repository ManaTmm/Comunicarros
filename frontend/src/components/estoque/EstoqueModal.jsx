function EstoqueModal({
  aberto,
  pecaEditando,
  formulario,
  erro,
  salvando,
  onCampoChange,
  onSalvar,
  onFechar
}) {
  if (!aberto) return null

  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div
        className="estoque-modal"
        onClick={(evento) => evento.stopPropagation()}
      >
        <div className="estoque-modal-header">
          <div>
            <span className="dashboard-greeting">ESTOQUE</span>
            <h4>{pecaEditando ? 'Editar peça' : 'Adicionar peça'}</h4>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onFechar}
            disabled={salvando}
          >
            ×
          </button>
        </div>

        <form onSubmit={onSalvar}>
          {erro && (
            <div className="alert alert-danger" role="alert">
              {erro}
            </div>
          )}

          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">Nome da peça *</label>
              <input
                type="text"
                name="nome"
                className="form-control"
                value={formulario.nome}
                onChange={onCampoChange}
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
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Modelo do veículo</label>
              <input
                type="text"
                name="modelo"
                className="form-control"
                value={formulario.modelo}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Ano</label>
              <input
                type="number"
                name="ano"
                className="form-control"
                min="1"
                step="1"
                placeholder="Ex: 2015"
                value={formulario.ano}
                onChange={onCampoChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Lado</label>
              <select
                name="lado"
                className="form-select"
                value={formulario.lado}
                onChange={onCampoChange}
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
                onChange={onCampoChange}
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
                onChange={onCampoChange}
              >
                <option>Original</option>
                <option>Paralelo</option>
                <option>Recondicionado</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Estado de conservação *</label>
              <select
                name="estado_conservacao"
                className="form-select"
                value={formulario.estado_conservacao}
                onChange={onCampoChange}
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
                onChange={onCampoChange}
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
                onChange={onCampoChange}
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
                onChange={onCampoChange}
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
                  onChange={onCampoChange}
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
              onClick={onFechar}
              disabled={salvando}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-danger" disabled={salvando}>
              {salvando
                ? 'Salvando...'
                : pecaEditando
                  ? 'Salvar alterações'
                  : 'Cadastrar peça'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EstoqueModal

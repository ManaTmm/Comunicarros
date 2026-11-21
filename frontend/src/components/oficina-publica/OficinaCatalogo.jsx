function formatarPreco(valor) {
  if (valor === null || valor === undefined || Number(valor) === 0) {
    return 'A combinar'
  }

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function OficinaCatalogo({ pecas, servicos }) {
  return (
    <>
      <section className="oficina-section mb-4">
        <h3 className="fw-bold mb-3">Peças disponíveis</h3>
        {pecas.length > 0 ? (
          <div className="row g-3">
            {pecas.map((peca) => (
              <div className="col-md-6" key={peca.id}>
                <div className="produto-card">
                  <div className="produto-placeholder">⚙</div>
                  <div className="p-3">
                    <h5 className="fw-bold">{peca.nome}</h5>
                    <p className="text-secondary small mb-2">
                      {[peca.marca, peca.modelo, peca.ano]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                    <p className="small mb-2">
                      Estado: {peca.estado_conservacao}
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <strong className="produto-preco">
                        {formatarPreco(peca.preco)}
                      </strong>
                      <span className="text-secondary small">
                        {peca.quantidade} disponível(is)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary">
            Esta oficina ainda não possui peças anunciadas.
          </p>
        )}
      </section>

      <section className="oficina-section">
        <h3 className="fw-bold mb-3">Serviços oferecidos</h3>
        {servicos.length > 0 ? (
          <div className="d-flex flex-column gap-3">
            {servicos.map((servico) => (
              <div className="servico-card" key={servico.id}>
                <div>
                  <h5 className="fw-bold mb-1">{servico.nome}</h5>
                  {servico.descricao && (
                    <p className="text-secondary mb-0 small">
                      {servico.descricao}
                    </p>
                  )}
                </div>
                <strong className="produto-preco">
                  {formatarPreco(servico.preco)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-secondary">Nenhum serviço anunciado.</p>
        )}
      </section>
    </>
  )
}

export default OficinaCatalogo

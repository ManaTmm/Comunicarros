function EstoqueIndicadores({ pecas, formatarPreco }) {
  const totalPecas = pecas.reduce(
    (total, peca) => total + Number(peca.quantidade),
    0
  )
  const pecasVisiveis = pecas.filter((peca) => peca.visivel).length
  const pecasOcultas = pecas.filter((peca) => !peca.visivel).length
  const valorEstoque = pecas.reduce(
    (total, peca) =>
      total + Number(peca.preco || 0) * Number(peca.quantidade),
    0
  )

  return (
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
          <h3 className="fs-4">{formatarPreco(valorEstoque)}</h3>
        </div>
      </div>
    </div>
  )
}

export default EstoqueIndicadores

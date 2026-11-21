function PainelIndicadores({ resumo, carregando }) {
  const indicadores = [
    {
      icone: '▤',
      titulo: 'Peças cadastradas',
      valor: resumo.pecas
    },
    {
      icone: '🔧',
      titulo: 'Serviços cadastrados',
      valor: resumo.servicos
    },
    {
      icone: '⚙',
      titulo: 'Oficina',
      valor: resumo.oficinaCadastrada ? 'Cadastrada' : 'Pendente'
    }
  ]

  return (
    <>
      <div className="dashboard-section-header">
        <h4>Visão geral</h4>
        <span>Resumo da sua oficina</span>
      </div>

      <div className="row g-4">
        {indicadores.map((indicador) => (
          <div className="col-md-4" key={indicador.titulo}>
            <div className="dashboard-stat">
              <span className="stat-icon">{indicador.icone}</span>
              <p>{indicador.titulo}</p>
              <h3>{carregando ? '…' : indicador.valor}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PainelIndicadores

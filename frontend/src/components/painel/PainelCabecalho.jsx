function PainelCabecalho({ nome }) {
  return (
    <div className="dashboard-header">
      <div>
        <span className="dashboard-greeting">PAINEL ADMINISTRATIVO</span>
        <h1>Bem-vindo, {nome || 'usuário'}!</h1>
        <p className="text-secondary">
          Gerencie sua oficina e acompanhe suas atividades.
        </p>
      </div>
    </div>
  )
}

export default PainelCabecalho

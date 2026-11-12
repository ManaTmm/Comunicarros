import { Link } from 'react-router-dom'

function Painel() {
  const usuario = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  )

  return (
    <div>

      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">
            PAINEL ADMINISTRATIVO
          </span>

          <h1>Bem-vindo, {usuario.nome}!</h1>

          <p className="text-secondary">
            Gerencie sua oficina e acompanhe suas atividades.
          </p>
        </div>
      </div>

      <section className="dashboard-welcome">

        <div>
          <span className="dashboard-greeting">
            PRIMEIROS PASSOS
          </span>

          <h2>Vamos configurar sua oficina?</h2>

          <p>
            Cadastre as informações da sua oficina para começar
            a divulgar seus produtos e serviços no Comunicarros.
          </p>

          <Link
            to="/painel/oficina"
            className="btn btn-danger"
          >
            Cadastrar minha oficina
          </Link>
        </div>

        <div className="dashboard-welcome-icon">
          ⚙
        </div>

      </section>

      <div className="dashboard-section-header">
        <h4>Visão geral</h4>
        <span>Resumo da sua oficina</span>
      </div>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="dashboard-stat">
            <span className="stat-icon">▤</span>
            <p>Peças cadastradas</p>
            <h3>—</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-stat">
            <span className="stat-icon">🔧</span>
            <p>Serviços cadastrados</p>
            <h3>—</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-stat">
            <span className="stat-icon">⚙</span>
            <p>Oficina</p>
            <h3>Pendente</h3>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Painel
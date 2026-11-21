import { Link } from 'react-router-dom'

function PainelBoasVindas({ oficinaCadastrada }) {
  return (
    <section className="dashboard-welcome">
      <div>
        <span className="dashboard-greeting">
          {oficinaCadastrada ? 'SUA OFICINA' : 'PRIMEIROS PASSOS'}
        </span>
        <h2>
          {oficinaCadastrada
            ? 'Sua oficina está cadastrada.'
            : 'Vamos configurar sua oficina?'}
        </h2>
        <p>
          {oficinaCadastrada
            ? 'Mantenha os dados do seu negócio atualizados para que clientes possam encontrar você.'
            : 'Cadastre as informações da sua oficina para começar a divulgar seus produtos e serviços no Comunicarros.'}
        </p>
        <Link to="/painel/oficina" className="btn btn-danger">
          {oficinaCadastrada
            ? 'Atualizar dados da oficina'
            : 'Cadastrar minha oficina'}
        </Link>
      </div>
      <div className="dashboard-welcome-icon">⚙</div>
    </section>
  )
}

export default PainelBoasVindas

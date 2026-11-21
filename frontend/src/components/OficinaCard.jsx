import { Link } from 'react-router-dom'

function OficinaCard({ oficina }) {
  return (
    <div className="oficina-card">

      <div className="oficina-card-header">
        <div className="oficina-avatar">
          {oficina.nome.charAt(0).toUpperCase()}
        </div>

        <span className="oficina-status">
          Oficina cadastrada
        </span>
      </div>

      <div className="oficina-card-body">
        <h5 className="fw-bold mb-1">{oficina.nome}</h5>

        <p className="text-secondary small mb-3">
          {[oficina.cidade, oficina.estado].filter(Boolean).join(' - ') ||
            'Localização não informada'}
        </p>

        <p className="oficina-descricao">
          {oficina.descricao}
        </p>

        <div className="oficina-servicos">
          {oficina.servicos.slice(0, 3).map((servico) => (
            <span key={servico.id || servico.nome}>
              {typeof servico === 'string' ? servico : servico.nome}
            </span>
          ))}
          {oficina.servicos.length === 0 && (
            <span>Serviços em breve</span>
          )}
        </div>
      </div>

      <div className="oficina-card-footer">
        <Link
          to={`/oficina/${oficina.id}`}
          className="btn btn-outline-danger w-100"
        >
          Conhecer oficina
        </Link>
      </div>

    </div>
  )
}

export default OficinaCard
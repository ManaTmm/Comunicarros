function OficinaCabecalho({ oficina, localizacao }) {
  return (
    <section className="oficina-banner">
      <div className="container py-5">
        <div className="d-flex align-items-center gap-3">
          <div className="oficina-avatar oficina-avatar-large">
            {oficina.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="fw-bold mb-1">{oficina.nome}</h1>
            <p className="text-secondary mb-0">
              {localizacao || 'Localização não informada'}
            </p>
          </div>
        </div>
        {oficina.descricao && (
          <p className="mt-4 mb-0 text-secondary">{oficina.descricao}</p>
        )}
      </div>
    </section>
  )
}

export default OficinaCabecalho

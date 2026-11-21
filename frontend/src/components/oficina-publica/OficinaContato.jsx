function formatarEndereco(oficina) {
  return [
    [oficina.endereco, oficina.numero].filter(Boolean).join(', '),
    oficina.complemento,
    oficina.bairro,
    oficina.cep
  ]
    .filter(Boolean)
    .join(' · ')
}

function OficinaContato({ oficina, localizacao }) {
  const telefoneLimpo = oficina.telefone?.replace(/\D/g, '')
  const endereco = formatarEndereco(oficina)

  return (
    <aside className="contato-card">
      <h4 className="fw-bold mb-4">Informações</h4>
      <div className="mb-3">
        <span className="info-label">Endereço</span>
        <p>{endereco || 'Não informado'}</p>
      </div>
      <div className="mb-3">
        <span className="info-label">Localização</span>
        <p>{localizacao || 'Não informada'}</p>
      </div>
      <div className="mb-4">
        <span className="info-label">Telefone</span>
        <p>{oficina.telefone || 'Não informado'}</p>
      </div>
      {telefoneLimpo ? (
        <a
          href={`https://wa.me/55${telefoneLimpo}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-danger w-100"
        >
          Entrar em contato
        </a>
      ) : (
        <button className="btn btn-danger w-100" disabled>
          Telefone não informado
        </button>
      )}
    </aside>
  )
}

export default OficinaContato

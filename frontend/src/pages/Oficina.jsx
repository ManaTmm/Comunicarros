import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { oficinas } from '../data/oficinas'

function Oficina() {
  const { id } = useParams()

  const oficina = oficinas.find(
    (item) => item.id === Number(id)
  )

  if (!oficina) {
    return (
      <>
        <Navbar />

        <div className="container text-center py-5">
          <h2>Oficina não encontrada.</h2>

          <Link to="/" className="btn btn-danger mt-3">
            Voltar ao início
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main>
        <section className="oficina-banner">
          <div className="container py-5">

            <div className="d-flex align-items-center gap-3">
              <div className="oficina-avatar oficina-avatar-large">
                {oficina.nome.charAt(0)}
              </div>

              <div>
                <h1 className="fw-bold mb-1">{oficina.nome}</h1>

                <p className="text-secondary mb-0">
                  {oficina.cidade} - {oficina.estado}
                </p>
              </div>
            </div>

            <p className="mt-4 mb-0 text-secondary">
              {oficina.descricao}
            </p>

          </div>
        </section>

        <div className="container py-5">

          <div className="row g-4">

            <div className="col-lg-8">

              <section className="oficina-section mb-4">
                <h3 className="fw-bold mb-3">Peças disponíveis</h3>

                {oficina.pecas.length > 0 ? (
                  <div className="row g-3">

                    {oficina.pecas.map((peca) => (
                      <div className="col-md-6" key={peca.id}>
                        <div className="produto-card">

                          <div className="produto-placeholder">
                            ⚙
                          </div>

                          <div className="p-3">
                            <h5 className="fw-bold">{peca.nome}</h5>

                            <p className="text-secondary small mb-2">
                              {peca.marca} {peca.modelo} · {peca.ano}
                            </p>

                            <p className="small mb-2">
                              Estado: {peca.estado}
                            </p>

                            <div className="d-flex justify-content-between align-items-center">
                              <strong className="produto-preco">
                                R$ {peca.preco.toFixed(2).replace('.', ',')}
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

                {oficina.servicos.length > 0 ? (
                  <div className="d-flex flex-column gap-3">

                    {oficina.servicos.map((servico) => (
                      <div className="servico-card" key={servico.id}>

                        <div>
                          <h5 className="fw-bold mb-1">
                            {servico.nome}
                          </h5>

                          <p className="text-secondary mb-0 small">
                            {servico.descricao}
                          </p>
                        </div>

                        <strong className="produto-preco">
                          R$ {servico.preco.toFixed(2).replace('.', ',')}
                        </strong>

                      </div>
                    ))}

                  </div>
                ) : (
                  <p className="text-secondary">
                    Nenhum serviço anunciado.
                  </p>
                )}
              </section>

            </div>

            <div className="col-lg-4">

              <aside className="contato-card">
                <h4 className="fw-bold mb-4">Informações</h4>

                <div className="mb-3">
                  <span className="info-label">Endereço</span>
                  <p>{oficina.endereco}</p>
                </div>

                <div className="mb-3">
                  <span className="info-label">Localização</span>
                  <p>{oficina.cidade} - {oficina.estado}</p>
                </div>

                <div className="mb-4">
                  <span className="info-label">Telefone</span>
                  <p>{oficina.telefone}</p>
                </div>

                <a
                  href={`https://wa.me/55${oficina.telefone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-danger w-100"
                >
                  Entrar em contato
                </a>
              </aside>

            </div>

          </div>

        </div>
      </main>
    </>
  )
}

export default Oficina
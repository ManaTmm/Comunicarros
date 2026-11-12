import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import OficinaCard from '../components/OficinaCard'
import { oficinas } from '../data/oficinas'

function Home() {
  const [pesquisa, setPesquisa] = useState('')

  // Filtra as oficinas de acordo com a pesquisa.
  const oficinasFiltradas = oficinas.filter((oficina) => {
    const termo = pesquisa.toLowerCase()

    return (
      oficina.nome.toLowerCase().includes(termo) ||
      oficina.cidade.toLowerCase().includes(termo) ||
      oficina.estado.toLowerCase().includes(termo) ||
      oficina.servicos.some((servico) => {
        const nomeServico =
          typeof servico === 'string' ? servico : servico.nome

        return nomeServico.toLowerCase().includes(termo)
      })
    )
  })

  return (
    <>
      <Navbar />

      <main>

        {/* Apresentação principal */}
        <section className="hero-section">
          <div className="container py-5">

            <div className="row align-items-center">

              <div className="col-lg-7">

                <span className="badge bg-danger-subtle text-danger mb-3">
                  Plataforma automotiva
                </span>

                <h1 className="display-4 fw-bold mb-3">
                  Conectando oficinas e oportunidades.
                </h1>

                <p className="lead text-secondary mb-4">
                  Encontre oficinas, consulte peças disponíveis e conheça
                  serviços automotivos em um só lugar.
                </p>

                <a href="#publico" className="btn btn-danger btn-lg">
                  Conheça o Comunicarros
                </a>

              </div>

              <div className="col-lg-5 mt-5 mt-lg-0">

                <div className="hero-card">

                  <div className="hero-card-icon">
                    ⚙
                  </div>

                  <h3>O mercado automotivo conectado.</h3>

                  <p className="text-secondary mb-0">
                    Mais visibilidade para oficinas e mais facilidade
                    para encontrar o que você precisa.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Escolha do público */}
        <section className="container py-5" id="publico">

          <div className="text-center mb-4">

            <h2 className="fw-bold">
              O que você procura?
            </h2>

            <p className="text-secondary">
              O Comunicarros conecta quem procura soluções automotivas
              a quem oferece.
            </p>

          </div>

          <div className="row g-4">

            {/* Cliente */}
            <div className="col-md-6">

              <div className="publico-card">

                <div className="publico-icon">
                  ♙
                </div>

                <h3>Sou cliente</h3>

                <p>
                  Encontre oficinas, consulte peças disponíveis,
                  conheça serviços e entre em contato diretamente.
                </p>

                <a href="#oficinas" className="btn btn-danger">
                  Explorar oficinas
                </a>

              </div>

            </div>

            {/* Oficina */}
            <div className="col-md-6">

              <div className="publico-card oficina">

                <div className="publico-icon">
                  ⚙
                </div>

                <h3>Sou uma oficina</h3>

                <p>
                  Divulgue seu negócio, anuncie peças disponíveis
                  e apresente seus serviços para novos clientes.
                </p>

                <Link to="/cadastro" className="btn btn-danger">
                  Cadastrar minha oficina
                </Link>

              </div>

            </div>

          </div>

        </section>

        {/* Catálogo de oficinas */}
        <section className="container py-5" id="oficinas">

          <div className="mb-4">

            <h2 className="fw-bold">
              Encontre uma oficina
            </h2>

            <p className="text-secondary">
              Explore oficinas cadastradas na plataforma.
            </p>

          </div>

          {/* Pesquisa */}
          <div className="search-box mb-5">

            <input
              type="text"
              className="form-control"
              placeholder="Pesquise por nome, cidade ou serviço..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />

            <button className="btn btn-danger">
              Buscar
            </button>

          </div>

          {/* Resultados */}
          <div className="row g-4">

            {oficinasFiltradas.length > 0 ? (

              oficinasFiltradas.map((oficina) => (

                <div className="col-md-6 col-lg-4" key={oficina.id}>
                  <OficinaCard oficina={oficina} />
                </div>

              ))

            ) : (

              <div className="col-12 text-center py-5">

                <h5 className="fw-bold">
                  Nenhuma oficina encontrada.
                </h5>

                <p className="text-secondary">
                  Tente pesquisar por outro nome, cidade ou serviço.
                </p>

              </div>

            )}

          </div>

        </section>

      </main>
    </>
  )
}

export default Home
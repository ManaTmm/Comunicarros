import { Link } from 'react-router-dom'

function PublicoSection() {
  return (
    <section className="container py-5" id="publico">
      <div className="text-center mb-4">
        <h2 className="fw-bold">O que você procura?</h2>
        <p className="text-secondary">
          O Comunicarros conecta quem procura soluções automotivas a quem
          oferece.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="publico-card">
            <div className="publico-icon">♙</div>
            <h3>Sou cliente</h3>
            <p>
              Encontre oficinas, consulte peças disponíveis, conheça serviços
              e entre em contato diretamente.
            </p>
            <a href="#oficinas" className="btn btn-danger">
              Explorar oficinas
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <div className="publico-card oficina">
            <div className="publico-icon">⚙</div>
            <h3>Sou uma oficina</h3>
            <p>
              Divulgue seu negócio, anuncie peças disponíveis e apresente seus
              serviços para novos clientes.
            </p>
            <Link to="/cadastro" className="btn btn-danger">
              Cadastrar minha oficina
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PublicoSection

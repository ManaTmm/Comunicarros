function HeroSection() {
  return (
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
              <div className="hero-card-icon">⚙</div>
              <h3>O mercado automotivo conectado.</h3>
              <p className="text-secondary mb-0">
                Mais visibilidade para oficinas e mais facilidade para
                encontrar o que você precisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

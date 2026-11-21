import { useState } from 'react'
import OficinaCard from '../OficinaCard'

function OficinasCatalogo({ oficinas, carregando, erro }) {
  const [pesquisa, setPesquisa] = useState('')
  const termo = pesquisa.trim().toLocaleLowerCase('pt-BR')

  const oficinasFiltradas = oficinas.filter((oficina) => {
    const textoOficina = [
      oficina.nome,
      oficina.cidade,
      oficina.estado,
      ...oficina.servicos.map((servico) => servico.nome)
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('pt-BR')

    return textoOficina.includes(termo)
  })

  return (
    <section className="container py-5" id="oficinas">
      <div className="mb-4">
        <h2 className="fw-bold">Encontre uma oficina</h2>
        <p className="text-secondary">
          Explore oficinas cadastradas na plataforma.
        </p>
      </div>

      <form
        className="search-box mb-5"
        onSubmit={(evento) => evento.preventDefault()}
        role="search"
      >
        <input
          type="search"
          className="form-control"
          placeholder="Pesquise por nome, cidade ou serviço..."
          value={pesquisa}
          onChange={(evento) => setPesquisa(evento.target.value)}
          aria-label="Pesquisar oficinas"
        />
        <button type="submit" className="btn btn-danger">
          Buscar
        </button>
      </form>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      {carregando ? (
        <p className="text-center py-5" role="status">
          Carregando oficinas...
        </p>
      ) : (
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
                {oficinas.length === 0
                  ? 'Nenhuma oficina cadastrada ainda.'
                  : 'Nenhuma oficina encontrada.'}
              </h5>
              <p className="text-secondary">
                {oficinas.length === 0
                  ? 'As oficinas aparecerão aqui quando forem cadastradas.'
                  : 'Tente pesquisar por outro nome, cidade ou serviço.'}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}

export default OficinasCatalogo

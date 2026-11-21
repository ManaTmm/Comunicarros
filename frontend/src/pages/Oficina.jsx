import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import OficinaCabecalho from '../components/oficina-publica/OficinaCabecalho'
import OficinaCatalogo from '../components/oficina-publica/OficinaCatalogo'
import OficinaContato from '../components/oficina-publica/OficinaContato'
import api from '../services/api'

function Oficina() {
  const { id } = useParams()
  const [oficina, setOficina] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarOficina() {
      try {
        setCarregando(true)
        setErro('')
        const resposta = await api.get(`/oficinas/publicas/${id}`)
        const oficinaCarregada = resposta.data.oficina

        if (ativo) {
          setOficina({
            ...oficinaCarregada,
            pecas: oficinaCarregada.pecas || [],
            servicos: oficinaCarregada.servicos || []
          })
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
            'Não foi possível carregar os dados desta oficina.'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarOficina()

    return () => {
      ativo = false
    }
  }, [id])

  const localizacao = oficina
    ? [oficina.cidade, oficina.estado].filter(Boolean).join(' - ')
    : ''

  return (
    <>
      <Navbar />

      {carregando ? (
        <div className="container text-center py-5" role="status">
          Carregando oficina...
        </div>
      ) : erro || !oficina ? (
        <div className="container text-center py-5">
          <h2>{erro || 'Oficina não encontrada.'}</h2>
          <Link to="/" className="btn btn-danger mt-3">
            Voltar ao início
          </Link>
        </div>
      ) : (
        <main>
          <OficinaCabecalho oficina={oficina} localizacao={localizacao} />

          <div className="container py-5">
            <div className="row g-4">
              <div className="col-lg-8">
                <OficinaCatalogo
                  pecas={oficina.pecas}
                  servicos={oficina.servicos}
                />
              </div>
              <div className="col-lg-4">
                <OficinaContato
                  oficina={oficina}
                  localizacao={localizacao}
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default Oficina

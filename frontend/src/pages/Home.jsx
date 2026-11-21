import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/home/HeroSection'
import OficinasCatalogo from '../components/home/OficinasCatalogo'
import PublicoSection from '../components/home/PublicoSection'
import api from '../services/api'

function Home() {
  const [oficinas, setOficinas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarOficinas() {
      try {
        setErro('')
        const resposta = await api.get('/oficinas/publicas')

        if (ativo) {
          setOficinas(
            (resposta.data.oficinas || []).map((oficina) => ({
              ...oficina,
              servicos: oficina.servicos || [],
              pecas: oficina.pecas || []
            }))
          )
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
            'Não foi possível carregar as oficinas. Tente novamente mais tarde.'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarOficinas()

    return () => {
      ativo = false
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PublicoSection />
        <OficinasCatalogo
          oficinas={oficinas}
          carregando={carregando}
          erro={erro}
        />
      </main>
    </>
  )
}

export default Home

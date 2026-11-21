import { useEffect, useState } from 'react'
import PainelBoasVindas from '../components/painel/PainelBoasVindas'
import PainelCabecalho from '../components/painel/PainelCabecalho'
import PainelIndicadores from '../components/painel/PainelIndicadores'
import api from '../services/api'

function Painel() {
  const [usuario, setUsuario] = useState({})
  const [resumo, setResumo] = useState({
    pecas: 0,
    servicos: 0,
    oficinaCadastrada: false
  })
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarPainel() {
      try {
        setErro('')
        const [respostaPerfil, respostaOficinas] = await Promise.all([
          api.get('/usuarios/perfil'),
          api.get('/oficinas')
        ])

        const usuarioCarregado = respostaPerfil.data.usuario
        const oficinas = respostaOficinas.data.oficinas || []
        const oficina = oficinas[0]

        if (ativo) {
          setUsuario(usuarioCarregado)
          localStorage.setItem('usuario', JSON.stringify(usuarioCarregado))
        }

        if (!oficina) {
          if (ativo) {
            setResumo({
              pecas: 0,
              servicos: 0,
              oficinaCadastrada: false
            })
          }
          return
        }

        const [respostaPecas, respostaServicos] = await Promise.all([
          api.get(`/pecas/oficina/${oficina.id}`),
          api.get(`/servicos/oficina/${oficina.id}`)
        ])

        if (ativo) {
          setResumo({
            pecas: (respostaPecas.data.pecas || []).length,
            servicos: (respostaServicos.data.servicos || []).length,
            oficinaCadastrada: true
          })
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
            'Não foi possível carregar o resumo do painel.'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarPainel()

    return () => {
      ativo = false
    }
  }, [])

  return (
    <div>
      <PainelCabecalho nome={usuario.nome} />
      <PainelBoasVindas oficinaCadastrada={resumo.oficinaCadastrada} />

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}

      <PainelIndicadores resumo={resumo} carregando={carregando} />
    </div>
  )
}

export default Painel

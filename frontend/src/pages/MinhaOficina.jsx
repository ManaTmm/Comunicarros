import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MinhaOficinaFormulario from '../components/minha-oficina/MinhaOficinaFormulario'
import api from '../services/api'

const formularioInicial = {
  nome: '',
  descricao: '',
  cnpj: '',
  telefone: '',
  cep: '',
  estado: '',
  cidade: '',
  bairro: '',
  endereco: '',
  numero: '',
  complemento: ''
}

function MinhaOficina() {
  const navigate = useNavigate()
  const [oficinaId, setOficinaId] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    let ativo = true

    async function carregarOficina() {
      try {
        const resposta = await api.get('/oficinas')
        const oficina = resposta.data.oficinas?.[0]

        if (ativo && oficina) {
          setOficinaId(oficina.id)
          setFormulario({
            nome: oficina.nome || '',
            descricao: oficina.descricao || '',
            cnpj: oficina.cnpj || '',
            telefone: oficina.telefone || '',
            cep: oficina.cep || '',
            estado: oficina.estado || '',
            cidade: oficina.cidade || '',
            bairro: oficina.bairro || '',
            endereco: oficina.endereco || '',
            numero: oficina.numero || '',
            complemento: oficina.complemento || ''
          })
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
            'Não foi possível carregar os dados da oficina.'
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
  }, [])

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setFormulario((atual) => ({ ...atual, [name]: value }))
  }

  async function salvarOficina(evento) {
    evento.preventDefault()
    setErro('')

    try {
      setSalvando(true)
      let mensagem

      if (oficinaId) {
        await api.patch(`/oficinas/${oficinaId}`, formulario)
        mensagem = 'Oficina atualizada com sucesso!'
      } else {
        const resposta = await api.post('/oficinas', formulario)
        setOficinaId(resposta.data.oficina.id)
        mensagem = 'Oficina cadastrada com sucesso!'
      }

      navigate('/painel', { state: { mensagem } })
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
        'Não foi possível salvar os dados da oficina.'
      )
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return <p role="status">Carregando dados da oficina...</p>
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">CONFIGURAÇÕES</span>
          <h1>Minha oficina</h1>
          <p className="text-secondary">
            Cadastre ou atualize as informações do seu negócio.
          </p>
        </div>
      </div>

      <MinhaOficinaFormulario
        formulario={formulario}
        oficinaId={oficinaId}
        erro={erro}
        salvando={salvando}
        onCampoChange={atualizarCampo}
        onSubmit={salvarOficina}
        onCancelar={() => navigate('/painel')}
      />
    </div>
  )
}

export default MinhaOficina

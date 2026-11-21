import { useEffect, useState } from 'react'
import PerfilFormulario from '../components/perfil/PerfilFormulario'
import PerfilResumo from '../components/perfil/PerfilResumo'
import PerfilSeguranca from '../components/perfil/PerfilSeguranca'
import api from '../services/api'

function Perfil() {
  const [usuario, setUsuario] = useState(null)
  const [formulario, setFormulario] = useState({ nome: '', email: '', telefone: '' })
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    let ativo = true

    async function carregarPerfil() {
      try {
        const resposta = await api.get('/usuarios/perfil')
        const usuarioCarregado = resposta.data.usuario

        if (ativo) {
          setUsuario(usuarioCarregado)
          setFormulario({
            nome: usuarioCarregado.nome || '',
            email: usuarioCarregado.email || '',
            telefone: usuarioCarregado.telefone || ''
          })
        }
      } catch (error) {
        if (ativo) {
          setErro(
            error.response?.data?.mensagem ||
            'Não foi possível carregar os dados do perfil.'
          )
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarPerfil()

    return () => {
      ativo = false
    }
  }, [])

  function atualizarFormulario(evento) {
    const { name, value } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value
    }))
  }

  async function salvarPerfil(evento) {
    evento.preventDefault()
    setErro('')
    setMensagem('')

    try {
      setSalvando(true)
      const resposta = await api.patch('/usuarios/perfil', {
        nome: formulario.nome.trim(),
        email: formulario.email.trim(),
        telefone: formulario.telefone.trim()
      })
      const usuarioAtualizado = resposta.data.usuario

      setUsuario(usuarioAtualizado)
      setFormulario({
        nome: usuarioAtualizado.nome || '',
        email: usuarioAtualizado.email || '',
        telefone: usuarioAtualizado.telefone || ''
      })
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado))
      setMensagem(resposta.data.mensagem || 'Seus dados foram atualizados com sucesso!')
    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
        'Não foi possível salvar as alterações do perfil.'
      )
    } finally {
      setSalvando(false)
    }
  }

  if (carregando) {
    return <p role="status">Carregando perfil...</p>
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">CONFIGURAÇÕES</span>
          <h1>Meu perfil</h1>
          <p className="text-secondary">
            Gerencie suas informações pessoais e dados da conta.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <PerfilFormulario
            formulario={formulario}
            mensagem={mensagem}
            erro={erro}
            salvando={salvando}
            onCampoChange={atualizarFormulario}
            onSubmit={salvarPerfil}
          />
        </div>

        <div className="col-lg-4">
          {usuario && <PerfilResumo usuario={usuario} formulario={formulario} />}
          <PerfilSeguranca />
        </div>
      </div>
    </div>
  )
}

export default Perfil

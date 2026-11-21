import { useEffect, useState } from 'react'
import api from '../services/api'

const formularioInicial = {
  nome: '',
  descricao: '',
  preco: '',
  visivel: true
}

function mensagemDaApi(error, fallback) {
  return error.response?.data?.mensagem || fallback
}

function normalizarServicos(servicosBanco) {
  return servicosBanco.map((servico) => ({
    ...servico,
    preco: servico.preco === null ? null : Number(servico.preco),
    visivel: Number(servico.visivel) === 1
  }))
}

function useServicos() {
  const [servicos, setServicos] = useState([])
  const [oficinaId, setOficinaId] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [erroFormulario, setErroFormulario] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [servicoEditando, setServicoEditando] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)

  useEffect(() => {
    let ativo = true

    async function carregarServicos() {
      try {
        setCarregando(true)
        setErro('')

        const respostaOficina = await api.get('/oficinas')
        const oficinas = respostaOficina.data.oficinas || []

        if (oficinas.length === 0) {
          if (ativo) setErro('Você precisa cadastrar sua oficina primeiro.')
          return
        }

        const id = oficinas[0].id
        const respostaServicos = await api.get(`/servicos/oficina/${id}`)

        if (ativo) {
          setOficinaId(id)
          setServicos(normalizarServicos(respostaServicos.data.servicos || []))
        }
      } catch (error) {
        if (ativo) {
          setErro(mensagemDaApi(error, 'Não foi possível carregar os serviços.'))
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarServicos()

    return () => {
      ativo = false
    }
  }, [])

  function abrirCadastro() {
    setServicoEditando(null)
    setFormulario(formularioInicial)
    setErroFormulario('')
    setModalAberto(true)
  }

  function abrirEdicao(servico) {
    setServicoEditando(servico)
    setFormulario({
      nome: servico.nome,
      descricao: servico.descricao || '',
      preco: servico.preco ?? '',
      visivel: servico.visivel
    })
    setErroFormulario('')
    setModalAberto(true)
  }

  function fecharModal() {
    if (salvando) return

    setModalAberto(false)
    setServicoEditando(null)
    setFormulario(formularioInicial)
    setErroFormulario('')
  }

  function atualizarFormulario(evento) {
    const { name, value, type, checked } = evento.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function salvarServico(evento) {
    evento.preventDefault()

    if (!oficinaId) {
      setErroFormulario('Não foi possível identificar sua oficina.')
      return
    }

    const dadosServico = {
      ...formulario,
      nome: formulario.nome.trim(),
      descricao: formulario.descricao.trim() || null,
      preco: formulario.preco === '' ? null : Number(formulario.preco)
    }

    if (!dadosServico.nome) {
      setErroFormulario('Informe o nome do serviço.')
      return
    }

    try {
      setSalvando(true)
      setErroFormulario('')

      if (servicoEditando) {
        await api.patch(
          `/servicos/oficina/${oficinaId}/servico/${servicoEditando.id}`,
          dadosServico
        )
        setServicos((anteriores) =>
          anteriores.map((servico) =>
            servico.id === servicoEditando.id
              ? { ...servico, ...dadosServico }
              : servico
          )
        )
      } else {
        const resposta = await api.post(
          `/servicos/oficina/${oficinaId}`,
          dadosServico
        )
        const servicoCriado = normalizarServicos([
          { ...dadosServico, ...resposta.data.servico }
        ])[0]
        setServicos((anteriores) => [servicoCriado, ...anteriores])
      }

      setModalAberto(false)
      setServicoEditando(null)
      setFormulario(formularioInicial)
    } catch (error) {
      setErroFormulario(
        mensagemDaApi(error, 'Não foi possível salvar o serviço.')
      )
    } finally {
      setSalvando(false)
    }
  }

  async function excluirServico(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este serviço?'
    )

    if (!confirmar || !oficinaId) return

    try {
      setSalvando(true)
      setErro('')
      await api.delete(`/servicos/oficina/${oficinaId}/servico/${id}`)
      setServicos((anteriores) =>
        anteriores.filter((servico) => servico.id !== id)
      )
    } catch (error) {
      setErro(mensagemDaApi(error, 'Não foi possível excluir o serviço.'))
    } finally {
      setSalvando(false)
    }
  }

  async function alternarVisibilidade(id) {
    const servico = servicos.find((item) => item.id === id)

    if (!servico || !oficinaId) return

    try {
      setSalvando(true)
      setErro('')
      await api.patch(
        `/servicos/oficina/${oficinaId}/servico/${id}`,
        { visivel: !servico.visivel }
      )
      setServicos((anteriores) =>
        anteriores.map((item) =>
          item.id === id
            ? { ...item, visivel: !servico.visivel }
            : item
        )
      )
    } catch (error) {
      setErro(
        mensagemDaApi(error, 'Não foi possível alterar a visibilidade.')
      )
    } finally {
      setSalvando(false)
    }
  }

  return {
    servicos,
    oficinaId,
    carregando,
    salvando,
    erro,
    erroFormulario,
    modalAberto,
    servicoEditando,
    formulario,
    abrirCadastro,
    abrirEdicao,
    fecharModal,
    atualizarFormulario,
    salvarServico,
    excluirServico,
    alternarVisibilidade
  }
}

export default useServicos

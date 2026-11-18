import { useEffect, useState } from 'react'
import api from '../services/api'
import EstoqueIndicadores from '../components/estoque/EstoqueIndicadores'
import EstoqueModal from '../components/estoque/EstoqueModal'
import EstoqueTabela from '../components/estoque/EstoqueTabela'

const formularioInicial = {
  nome: '',
  descricao: '',
  marca: '',
  modelo: '',
  ano: '',
  lado: 'Não se aplica',
  posicao: 'Não se aplica',
  tipo: 'Original',
  estado_conservacao: 'Usado',
  quantidade: 1,
  preco: '',
  visivel: true
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function mensagemDaApi(error, fallback) {
  return error.response?.data?.mensagem || fallback
}

async function buscarPecas(oficinaId) {
  const resposta = await api.get(`/pecas/oficina/${oficinaId}`)
  const pecasBanco = resposta.data.pecas || []

  return pecasBanco.map((peca) => ({
    ...peca,
    quantidade: Number(peca.quantidade),
    preco: peca.preco === null ? null : Number(peca.preco),
    visivel: Number(peca.visivel) === 1
  }))
}

function Estoque() {
  const [pecas, setPecas] = useState([])
  const [oficinaId, setOficinaId] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')
  const [erroFormulario, setErroFormulario] = useState('')

  const [pesquisa, setPesquisa] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [filtroVisibilidade, setFiltroVisibilidade] = useState('Todos')

  const [modalAberto, setModalAberto] = useState(false)
  const [pecaEditando, setPecaEditando] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)

  useEffect(() => {
    let ativo = true

    async function carregarEstoque() {
      try {
        setCarregando(true)
        setErro('')

        const respostaOficina = await api.get('/oficinas')
        const oficinas = respostaOficina.data.oficinas || []

        if (oficinas.length === 0) {
          setErro('Você precisa cadastrar sua oficina primeiro.')
          return
        }

        const id = oficinas[0].id
        const pecasCarregadas = await buscarPecas(id)

        if (ativo) {
          setOficinaId(id)
          setPecas(pecasCarregadas)
        }
      } catch (error) {
        if (ativo) {
          setErro(mensagemDaApi(error, 'Não foi possível carregar o estoque.'))
        }
      } finally {
        if (ativo) setCarregando(false)
      }
    }

    carregarEstoque()

    return () => {
      ativo = false
    }
  }, [])

  const pecasFiltradas = pecas.filter((peca) => {
    const termo = pesquisa.toLowerCase()
    const correspondePesquisa =
      String(peca.nome || '').toLowerCase().includes(termo) ||
      String(peca.marca || '').toLowerCase().includes(termo) ||
      String(peca.modelo || '').toLowerCase().includes(termo)
    const correspondeEstado =
      filtroEstado === 'Todos' ||
      peca.estado_conservacao === filtroEstado
    const correspondeVisibilidade =
      filtroVisibilidade === 'Todos' ||
      (filtroVisibilidade === 'Visíveis' && peca.visivel) ||
      (filtroVisibilidade === 'Ocultas' && !peca.visivel)

    return (
      correspondePesquisa &&
      correspondeEstado &&
      correspondeVisibilidade
    )
  })

  function atualizarCampo(evento) {
    const { name, value, type, checked } = evento.target

    setFormulario((atual) => ({
      ...atual,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  function abrirCadastro() {
    setPecaEditando(null)
    setFormulario(formularioInicial)
    setErroFormulario('')
    setModalAberto(true)
  }

  function abrirEdicao(peca) {
    setPecaEditando(peca.id)
    setFormulario({
      ...formularioInicial,
      ...peca,
      preco: peca.preco ?? ''
    })
    setErroFormulario('')
    setModalAberto(true)
  }

  function fecharModal() {
    if (salvando) return

    setModalAberto(false)
    setPecaEditando(null)
    setFormulario(formularioInicial)
    setErroFormulario('')
  }

  async function salvarPeca(evento) {
    evento.preventDefault()

    if (!oficinaId) {
      setErroFormulario('Não foi possível identificar sua oficina.')
      return
    }

    const dadosPeca = {
      ...formulario,
      nome: formulario.nome.trim(),
      ano: formulario.ano === '' ? null : Number(formulario.ano),
      quantidade: Number(formulario.quantidade),
      preco: formulario.preco === '' ? null : Number(formulario.preco)
    }

    try {
      setSalvando(true)
      setErroFormulario('')

      if (pecaEditando !== null) {
        await api.patch(
          `/pecas/oficina/${oficinaId}/peca/${pecaEditando}`,
          dadosPeca
        )
        setPecas((lista) =>
          lista.map((peca) =>
            peca.id === pecaEditando ? { ...peca, ...dadosPeca } : peca
          )
        )
      } else {
        const resposta = await api.post(
          `/pecas/oficina/${oficinaId}`,
          dadosPeca
        )
        setPecas((lista) => [
          { ...dadosPeca, ...resposta.data.peca },
          ...lista
        ])
      }

      setModalAberto(false)
      setPecaEditando(null)
      setFormulario(formularioInicial)
    } catch (error) {
      setErroFormulario(
        mensagemDaApi(error, 'Não foi possível salvar a peça.')
      )
    } finally {
      setSalvando(false)
    }
  }

  async function excluirPeca(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta peça?'
    )

    if (!confirmar) return

    try {
      setSalvando(true)
      setErro('')
      await api.delete(`/pecas/oficina/${oficinaId}/peca/${id}`)
      setPecas((lista) => lista.filter((peca) => peca.id !== id))
    } catch (error) {
      setErro(mensagemDaApi(error, 'Não foi possível excluir a peça.'))
    } finally {
      setSalvando(false)
    }
  }

  async function alternarVisibilidade(id) {
    const peca = pecas.find((item) => item.id === id)

    if (!peca) return

    try {
      setSalvando(true)
      setErro('')
      await api.patch(
        `/pecas/oficina/${oficinaId}/peca/${id}`,
        { visivel: !peca.visivel }
      )
      setPecas((lista) =>
        lista.map((item) =>
          item.id === id ? { ...item, visivel: !peca.visivel } : item
        )
      )
    } catch (error) {
      setErro(
        mensagemDaApi(error, 'Não foi possível alterar a visibilidade da peça.')
      )
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">GERENCIAMENTO</span>
          <h1>Estoque</h1>
          <p className="text-secondary">
            Gerencie as peças disponíveis na sua oficina.
          </p>
        </div>

        <button
          className="btn btn-danger"
          onClick={abrirCadastro}
          disabled={carregando || oficinaId === null || salvando}
        >
          + Adicionar peça
        </button>
      </div>

      {erro && (
        <div className="alert alert-danger" role="alert">
          {erro}
        </div>
      )}
      {carregando && <p role="status">Carregando estoque...</p>}

      <EstoqueIndicadores pecas={pecas} formatarPreco={formatarPreco} />

      <EstoqueTabela
        pecas={pecasFiltradas}
        totalPecas={pecas.length}
        carregando={carregando}
        pesquisa={pesquisa}
        filtroEstado={filtroEstado}
        filtroVisibilidade={filtroVisibilidade}
        onPesquisaChange={setPesquisa}
        onFiltroEstadoChange={setFiltroEstado}
        onFiltroVisibilidadeChange={setFiltroVisibilidade}
        onEditar={abrirEdicao}
        onExcluir={excluirPeca}
        onAlternarVisibilidade={alternarVisibilidade}
        formatarPreco={formatarPreco}
        salvando={salvando}
      />

      <EstoqueModal
        aberto={modalAberto}
        pecaEditando={pecaEditando}
        formulario={formulario}
        erro={erroFormulario}
        salvando={salvando}
        onCampoChange={atualizarCampo}
        onSalvar={salvarPeca}
        onFechar={fecharModal}
      />
    </div>
  )
}

export default Estoque

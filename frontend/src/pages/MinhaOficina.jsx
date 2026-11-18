import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function MinhaOficina() {
  const navigate = useNavigate()

  const [oficinaId, setOficinaId] = useState(null)

  const [formulario, setFormulario] = useState({
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
  })

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    async function carregarOficina() {
      try {
        const resposta = await api.get('/oficinas')

        const oficinas = resposta.data.oficinas || []

        if (oficinas.length > 0) {
          const oficina = oficinas[0]

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
        setErro(
          error.response?.data?.mensagem ||
          'Não foi possível carregar os dados da oficina.'
        )
      } finally {
        setCarregando(false)
      }
    }

    carregarOficina()
  }, [])

  function atualizarCampo(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  async function salvarOficina(e) {
    e.preventDefault()
    setErro('')

    try {
      setSalvando(true)

      if (oficinaId) {
        await api.patch(`/oficinas/${oficinaId}`, formulario)
      } else {
        const resposta = await api.post('/oficinas', formulario)

        setOficinaId(resposta.data.oficina.id)
      }

      navigate('/painel', {
        state: {
          mensagem: oficinaId
            ? 'Oficina atualizada com sucesso!'
            : 'Oficina cadastrada com sucesso!'
        }
      })

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
    return <p>Carregando dados da oficina...</p>
  }

  return (
    <div>

      <div className="dashboard-header">
        <div>
          <span className="dashboard-greeting">
            CONFIGURAÇÕES
          </span>

          <h1>Minha oficina</h1>

          <p className="text-secondary">
            Cadastre ou atualize as informações do seu negócio.
          </p>
        </div>
      </div>

      <div className="dashboard-welcome mb-4">
        <div>
          <h2>Apresente sua oficina</h2>

          <p>
            Essas informações serão utilizadas para identificar
            seu negócio e permitir que clientes encontrem você
            no Comunicarros.
          </p>
        </div>

        <div className="dashboard-welcome-icon">
          ⚙
        </div>
      </div>

      <form onSubmit={salvarOficina}>

        <div className="dashboard-stat mb-4">

          <h4 className="mb-4">Informações principais</h4>

          <div className="row g-3">

            <div className="col-md-8">
              <label className="form-label">
                Nome da oficina *
              </label>

              <input
                type="text"
                name="nome"
                className="form-control"
                value={formulario.nome}
                onChange={atualizarCampo}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">CNPJ</label>

              <input
                type="text"
                name="cnpj"
                className="form-control"
                value={formulario.cnpj}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Descrição</label>

              <textarea
                name="descricao"
                className="form-control"
                rows="4"
                value={formulario.descricao}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Telefone / WhatsApp
              </label>

              <input
                type="tel"
                name="telefone"
                className="form-control"
                value={formulario.telefone}
                onChange={atualizarCampo}
              />
            </div>

          </div>

        </div>

        <div className="dashboard-stat mb-4">

          <h4 className="mb-4">Endereço</h4>

          <div className="row g-3">

            <div className="col-md-3">
              <label className="form-label">CEP</label>

              <input
                type="text"
                name="cep"
                className="form-control"
                value={formulario.cep}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Estado</label>

              <input
                type="text"
                name="estado"
                className="form-control"
                value={formulario.estado}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Cidade</label>

              <input
                type="text"
                name="cidade"
                className="form-control"
                value={formulario.cidade}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Bairro</label>

              <input
                type="text"
                name="bairro"
                className="form-control"
                value={formulario.bairro}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-8">
              <label className="form-label">Rua / Avenida</label>

              <input
                type="text"
                name="endereco"
                className="form-control"
                value={formulario.endereco}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Número</label>

              <input
                type="text"
                name="numero"
                className="form-control"
                value={formulario.numero}
                onChange={atualizarCampo}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Complemento</label>

              <input
                type="text"
                name="complemento"
                className="form-control"
                value={formulario.complemento}
                onChange={atualizarCampo}
              />
            </div>

          </div>

        </div>

        {erro && (
          <div className="alert alert-danger">
            {erro}
          </div>
        )}

        <div className="d-flex gap-2 mb-5">

          <button
            type="submit"
            className="btn btn-danger"
            disabled={salvando}
          >
            {salvando
              ? 'Salvando...'
              : oficinaId
                ? 'Salvar alterações'
                : 'Cadastrar oficina'}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate('/painel')}
          >
            Cancelar
          </button>

        </div>

      </form>

    </div>
  )
}

export default MinhaOficina
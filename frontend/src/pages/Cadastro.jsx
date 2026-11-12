import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import api from '../services/api'

function Cadastro() {
  const navigate = useNavigate()

  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  })

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function atualizarCampo(e) {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrar(e) {
    e.preventDefault()
    setErro('')

    if (formulario.senha !== formulario.confirmarSenha) {
      setErro('As senhas não coincidem.')
      return
    }

    if (formulario.senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    try {
      setCarregando(true)

      await api.post('/usuarios', {
        nome: formulario.nome,
        email: formulario.email,
        senha: formulario.senha
      })

      navigate('/login', {
        state: { mensagem: 'Conta criada com sucesso! Faça seu login.' }
      })

    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
        'Não foi possível criar sua conta.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AuthLayout
      titulo="Crie sua conta"
      descricao="Comece a conectar sua oficina ao mercado."
    >

      <form onSubmit={cadastrar}>

        <div className="mb-3">
          <label className="form-label">Nome completo</label>

          <input
            type="text"
            name="nome"
            className="form-control auth-input"
            placeholder="Seu nome"
            value={formulario.nome}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>

          <input
            type="email"
            name="email"
            className="form-control auth-input"
            placeholder="seu@email.com"
            value={formulario.email}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>

          <input
            type="password"
            name="senha"
            className="form-control auth-input"
            placeholder="Mínimo de 6 caracteres"
            value={formulario.senha}
            onChange={atualizarCampo}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar senha</label>

          <input
            type="password"
            name="confirmarSenha"
            className="form-control auth-input"
            placeholder="Digite sua senha novamente"
            value={formulario.confirmarSenha}
            onChange={atualizarCampo}
            required
          />
        </div>

        {erro && (
          <div className="alert alert-danger py-2">
            {erro}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-danger w-100 auth-button"
          disabled={carregando}
        >
          {carregando ? 'Criando conta...' : 'Criar conta'}
        </button>

      </form>

      <p className="text-center mt-4 mb-0 text-secondary">
        Já possui uma conta?{' '}
        <Link to="/login" className="auth-link">
          Entrar
        </Link>
      </p>

    </AuthLayout>
  )
}

export default Cadastro
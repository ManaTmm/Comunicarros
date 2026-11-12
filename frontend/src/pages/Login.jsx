import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../layouts/AuthLayout'
import api from '../services/api'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const mensagem = location.state?.mensagem

  async function entrar(e) {
    e.preventDefault()
    setErro('')

    try {
      setCarregando(true)

      const resposta = await api.post('/auth/login', {
        email,
        senha
      })

      localStorage.setItem('token', resposta.data.token)

      localStorage.setItem(
        'usuario',
        JSON.stringify(resposta.data.usuario)
      )

      navigate('/painel')

    } catch (error) {
      setErro(
        error.response?.data?.mensagem ||
        'E-mail ou senha incorretos.'
      )
    } finally {
      setCarregando(false)
    }
  }

  return (
    <AuthLayout
      titulo="Bem-vindo de volta"
      descricao="Entre com seus dados para acessar sua conta."
    >

      {mensagem && (
        <div className="alert alert-success py-2">
          {mensagem}
        </div>
      )}

      <form onSubmit={entrar}>

        <div className="mb-3">
          <label className="form-label">E-mail</label>

          <input
            type="email"
            className="form-control auth-input"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>

          <input
            type="password"
            className="form-control auth-input"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
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
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>

      </form>

      <p className="text-center mt-4 mb-0 text-secondary">
        Ainda não possui uma conta?{' '}
        <Link to="/cadastro" className="auth-link">
          Cadastre-se
        </Link>
      </p>

    </AuthLayout>
  )
}

export default Login
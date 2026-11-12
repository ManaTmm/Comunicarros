import { Link } from 'react-router-dom'

function AuthLayout({ children, titulo, descricao }) {
  return (
    <div className="auth-container">

      <div className="auth-brand">
        <Link to="/" className="auth-logo">
          <span>Comuni</span>carros
        </Link>

        <div className="auth-brand-content">
          <span className="badge bg-light text-danger mb-3">
            Plataforma automotiva
          </span>

          <h1>O mercado automotivo conectado.</h1>

          <p>
            Encontre oficinas, divulgue seus serviços e conecte-se
            a novas oportunidades.
          </p>
        </div>

        <span className="auth-footer">
          Comunicarros © 2026
        </span>
      </div>

      <div className="auth-form-container">
        <div className="auth-form">

          <Link to="/" className="auth-back">
            ← Voltar ao início
          </Link>

          <div className="mb-4">
            <h2 className="fw-bold">{titulo}</h2>
            <p className="text-secondary">{descricao}</p>
          </div>

          {children}

        </div>
      </div>

    </div>
  )
}

export default AuthLayout
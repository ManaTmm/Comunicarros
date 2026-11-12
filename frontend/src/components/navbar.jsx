import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom">
      <div className="container py-2">
        <Link className="navbar-brand fw-bold fs-4" to="/">
          <span className="text-danger">Comuni</span>carros
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/" className="text-decoration-none text-dark">
            Oficinas
          </Link>

          <Link to="/login" className="btn btn-outline-danger">
           Área da oficina
          </Link>

          <Link to="/cadastro" className="btn btn-danger">
           Cadastrar oficina
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
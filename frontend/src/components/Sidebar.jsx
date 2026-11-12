import { NavLink, useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()

  function sair() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    navigate('/')
  }

  const links = [
    { nome: 'Início', caminho: '/painel', icone: '⌂', exato: true },
    { nome: 'Minha oficina', caminho: '/painel/oficina', icone: '⚙' },
    { nome: 'Estoque', caminho: '/painel/estoque', icone: '▤' },
    { nome: 'Serviços', caminho: '/painel/servicos', icone: '🔧' },
    { nome: 'Meu perfil', caminho: '/painel/perfil', icone: '♙' }
  ]

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <span>Comuni</span>carros
      </div>

      <div className="sidebar-menu">

        <span className="sidebar-label">MENU PRINCIPAL</span>

        {links.map((link) => (
          <NavLink
            key={link.caminho}
            to={link.caminho}
            end={link.exato}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon">{link.icone}</span>
            {link.nome}
          </NavLink>
        ))}

      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-link sidebar-logout" onClick={sair}>
          <span className="sidebar-icon">↪</span>
          Sair da conta
        </button>
      </div>

    </aside>
  )
}

export default Sidebar
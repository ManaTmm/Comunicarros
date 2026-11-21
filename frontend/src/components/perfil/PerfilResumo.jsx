function PerfilResumo({ usuario, formulario }) {
  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="profile-avatar">
          {formulario.nome.charAt(0).toUpperCase() || '?'}
        </div>

        <h5 className="text-center mt-3 mb-1">
          {formulario.nome || 'Usuário'}
        </h5>
        <p className="text-secondary text-center small">{formulario.email}</p>

        <hr />

        <div className="profile-info">
          <span>Identificação da conta</span>
          <strong>#{usuario.id || '—'}</strong>
        </div>
        <div className="profile-info">
          <span>Tipo de conta</span>
          <strong>Oficina</strong>
        </div>
        <div className="profile-info">
          <span>Situação</span>
          <span className="badge bg-success">Ativa</span>
        </div>
      </div>
    </div>
  )
}

export default PerfilResumo

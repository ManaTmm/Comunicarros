import { useState } from 'react'

function Perfil() {
  const usuarioSalvo = JSON.parse(
    localStorage.getItem('usuario') || '{}'
  )

  const [formulario, setFormulario] = useState({
    nome: usuarioSalvo.nome || '',
    email: usuarioSalvo.email || '',
    telefone: usuarioSalvo.telefone || '',
  })

  const [mensagem, setMensagem] = useState('')

  function atualizarFormulario(event) {
    const { name, value } = event.target

    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }))
  }

  function salvarPerfil(event) {
    event.preventDefault()

    const usuarioAtualizado = {
      ...usuarioSalvo,
      ...formulario,
    }

    localStorage.setItem(
      'usuario',
      JSON.stringify(usuarioAtualizado)
    )

    setMensagem('Seus dados foram atualizados com sucesso!')
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
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-1">Informações pessoais</h4>

              <p className="text-secondary mb-4">
                Mantenha seus dados sempre atualizados.
              </p>

              {mensagem && (
                <div className="alert alert-success">
                  {mensagem}
                </div>
              )}

              <form onSubmit={salvarPerfil}>
                <div className="mb-3">
                  <label className="form-label">
                    Nome completo
                  </label>

                  <input
                    type="text"
                    name="nome"
                    className="form-control"
                    value={formulario.nome}
                    onChange={atualizarFormulario}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    E-mail
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formulario.email}
                    onChange={atualizarFormulario}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Telefone
                  </label>

                  <input
                    type="tel"
                    name="telefone"
                    className="form-control"
                    placeholder="(00) 00000-0000"
                    value={formulario.telefone}
                    onChange={atualizarFormulario}
                  />
                </div>

                <button type="submit" className="btn btn-danger">
                  Salvar alterações
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="profile-avatar">
                {formulario.nome.charAt(0).toUpperCase() || '?'}
              </div>

              <h5 className="text-center mt-3 mb-1">
                {formulario.nome || 'Usuário'}
              </h5>

              <p className="text-secondary text-center small">
                {formulario.email}
              </p>

              <hr />

              <div className="profile-info">
                <span>Identificação da conta</span>
                <strong>#{usuarioSalvo.id || '—'}</strong>
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

          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body p-4">
              <h5>Segurança</h5>

              <p className="text-secondary small mb-0">
                A alteração de senha será disponibilizada
                posteriormente, durante a integração com o backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Perfil
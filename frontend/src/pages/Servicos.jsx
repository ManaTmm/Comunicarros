import { useState } from 'react'
import ServicoModal from '../components/servicos/ServicoModal'
import ServicosCabecalho from '../components/servicos/ServicosCabecalho'
import ServicosTabela from '../components/servicos/ServicosTabela'
import useServicos from '../hooks/useServicos'

function formatarPreco(valor) {
  if (!valor) return 'A combinar'

  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function Servicos() {
  const [pesquisa, setPesquisa] = useState('')
  const {
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
  } = useServicos()

  return (
    <div>
      <ServicosCabecalho
        quantidade={servicos.length}
        carregando={carregando}
        oficinaId={oficinaId}
        salvando={salvando}
        erro={erro}
        onNovo={abrirCadastro}
      />

      <ServicosTabela
        servicos={servicos}
        pesquisa={pesquisa}
        carregando={carregando}
        salvando={salvando}
        onPesquisaChange={setPesquisa}
        onAlternarVisibilidade={alternarVisibilidade}
        onEditar={abrirEdicao}
        onExcluir={excluirServico}
        formatarPreco={formatarPreco}
      />

      <ServicoModal
        aberto={modalAberto}
        servicoEditando={servicoEditando}
        formulario={formulario}
        erro={erroFormulario}
        salvando={salvando}
        onCampoChange={atualizarFormulario}
        onSalvar={salvarServico}
        onFechar={fecharModal}
      />
    </div>
  )
}

export default Servicos

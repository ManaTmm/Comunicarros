export const oficinas = [
  {
    id: 1,
    nome: 'Auto Center Exemplo',
    cidade: 'Governador Valadares',
    estado: 'MG',
    descricao: 'Especializada em manutenção e revisão automotiva.',
    endereco: 'Rua Exemplo, 100',
    telefone: '(33) 99999-9999',
    servicos: [
      {
        id: 1,
        nome: 'Revisão automotiva',
        descricao: 'Revisão completa de veículos.',
        preco: 250
      },
      {
        id: 2,
        nome: 'Troca de óleo',
        descricao: 'Troca de óleo e filtros.',
        preco: 120
      }
    ],
    pecas: [
      {
        id: 1,
        nome: 'Farol dianteiro',
        marca: 'Volkswagen',
        modelo: 'Gol G5',
        ano: '2009-2012',
        estado: 'Usado',
        preco: 180,
        quantidade: 2
      },
      {
        id: 2,
        nome: 'Retrovisor esquerdo',
        marca: 'Fiat',
        modelo: 'Palio',
        ano: '2012-2017',
        estado: 'Novo',
        preco: 150,
        quantidade: 1
      }
    ]
  },
  {
    id: 2,
    nome: 'Oficina Modelo',
    cidade: 'Governador Valadares',
    estado: 'MG',
    descricao: 'Serviços de funilaria, pintura e recuperação automotiva.',
    endereco: 'Avenida Modelo, 200',
    telefone: '(33) 98888-8888',
    servicos: [
      {
        id: 1,
        nome: 'Pintura automotiva',
        descricao: 'Pintura e recuperação da carroceria.',
        preco: 1500
      }
    ],
    pecas: []
  },
  {
    id: 3,
    nome: 'Centro Automotivo Teste',
    cidade: 'Ipatinga',
    estado: 'MG',
    descricao: 'Atendimento especializado em manutenção de veículos.',
    endereco: 'Rua Teste, 300',
    telefone: '(31) 97777-7777',
    servicos: [
      {
        id: 1,
        nome: 'Diagnóstico eletrônico',
        descricao: 'Análise eletrônica de sistemas automotivos.',
        preco: 100
      }
    ],
    pecas: []
  }
]
# Comunicarros

**Marketplace e rede de conexão para oficinas automotivas.**

O Comunicarros é um projeto de desenvolvimento de software que busca conectar oficinas automotivas, facilitando a divulgação, localização e comercialização de peças, além da divulgação de serviços.

A proposta é oferecer uma plataforma acessível especialmente para pequenas oficinas e profissionais independentes, contribuindo para sua presença digital e ampliando suas oportunidades comerciais.

## Objetivo

Desenvolver uma plataforma que permita às oficinas cadastrar seus estabelecimentos, organizar seus estoques e disponibilizar peças e serviços para consulta por potenciais clientes.

## Funcionalidades planejadas

* Cadastro e autenticação de usuários.
* Cadastro e gerenciamento de oficinas.
* Criação e gerenciamento de estoques.
* Cadastro, edição e exclusão de peças.
* Adição de fotografias aos anúncios.
* Pesquisa e filtragem de peças.
* Cadastro e divulgação de serviços.
* Páginas individuais para oficinas e anúncios.

## Tecnologias

### Frontend

* React
* Vite
* JavaScript
* Bootstrap
* React Router
* Axios

### Backend

* Node.js
* Express
* JavaScript
* MySQL
* mysql2
* CORS
* dotenv

### Ferramentas

* Git e GitHub
* MySQL Workbench
* Visual Studio Code

## Estrutura do projeto

```text
Comunicarros/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   │
│   └── ...
│
└── README.md
```

## Banco de dados

O projeto utiliza MySQL como sistema de gerenciamento de banco de dados.

A modelagem inicial contempla seis entidades:

* `usuarios`
* `oficinas`
* `estoque`
* `pecas`
* `fotos_pecas`
* `servicos`

A estrutura foi projetada para permitir que cada oficina gerencie seu próprio estoque, suas peças e seus serviços.

## Instalação e execução

O projeto possui frontend e backend separados.

### Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure as variáveis de ambiente em um arquivo `.env`, utilizando as configurações do seu ambiente MySQL.

Inicie o servidor em desenvolvimento:

```bash
npm run dev
```

### Frontend

Em outro terminal, entre na pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

## Status do projeto

Em desenvolvimento.

Atualmente, o projeto possui a estrutura inicial de frontend e backend, conexão com o banco de dados MySQL e modelagem inicial das entidades.

As funcionalidades da plataforma ainda estão sendo implementadas.

## Objetivo educacional

O Comunicarros também é um projeto de aprendizado e portfólio, desenvolvido para aplicar conhecimentos de desenvolvimento web, modelagem de dados, arquitetura de software, integração entre sistemas e controle de versão.

> **Status: Em desenvolvimento**
>
> O Comunicarros é um projeto independente que ainda está em fase de desenvolvimento. Algumas funcionalidades estão incompletas ou ainda não foram implementadas.
>
> Este repositório documenta o progresso do projeto, incluindo sua estrutura, implementação e evolução ao longo do desenvolvimento.

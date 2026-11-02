CREATE DATABASE IF NOT EXISTS comunicarros
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE comunicarros;

-- Tabela de usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Tabela de oficinas
CREATE TABLE oficinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    cep VARCHAR(9),
    estado CHAR(2),
    cidade VARCHAR(100),
    bairro VARCHAR(100),
    endereco VARCHAR(200),
    numero VARCHAR(20),
    complemento VARCHAR(100),
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_oficinas_usuarios
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- Cada oficina possui um único estoque
CREATE TABLE estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    oficina_id INT NOT NULL UNIQUE,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_estoque_oficinas
        FOREIGN KEY (oficina_id) REFERENCES oficinas(id)
) ENGINE=InnoDB;

-- Peças cadastradas no estoque de cada oficina
CREATE TABLE pecas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    estoque_id INT NOT NULL,
    id_local INT UNSIGNED NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    marca VARCHAR(80),
    modelo VARCHAR(100),
    ano SMALLINT,
    lado VARCHAR(20),
    posicao VARCHAR(20),
    tipo VARCHAR(20),
    estado_conservacao VARCHAR(20) NOT NULL,
    quantidade INT UNSIGNED NOT NULL DEFAULT 1,
    preco DECIMAL(10,2),
    visivel BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(20) NOT NULL DEFAULT 'disponivel',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_pecas_estoque
        FOREIGN KEY (estoque_id) REFERENCES estoque(id),

    CONSTRAINT uq_pecas_id_local
        UNIQUE (estoque_id, id_local)
) ENGINE=InnoDB;

-- Fotos vinculadas às peças
CREATE TABLE fotos_pecas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    peca_id INT NOT NULL,
    caminho VARCHAR(500) NOT NULL,
    principal BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_fotos_pecas
        FOREIGN KEY (peca_id) REFERENCES pecas(id)
) ENGINE=InnoDB;

-- Serviços oferecidos pelas oficinas
CREATE TABLE servicos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    oficina_id INT NOT NULL,
    nome VARCHAR(120) NOT NULL,
    descricao TEXT,
    preco DECIMAL(10,2),
    visivel BOOLEAN NOT NULL DEFAULT TRUE,
    status VARCHAR(20) NOT NULL DEFAULT 'ativo',
    criado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    atualizado_em DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_servicos_oficinas
        FOREIGN KEY (oficina_id) REFERENCES oficinas(id)
) ENGINE=InnoDB;
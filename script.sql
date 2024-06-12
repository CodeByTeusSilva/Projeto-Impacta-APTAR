Table entidade {
  id bigint [primary key, increment]
  data_criacao date
  numero int
  dtype varchar(31) [not null]
  bairro varchar(255)
  cep varchar(255)
  cidade varchar(255)
  cnpj varchar(255) [unique]
  complemento varchar(255)
  cpf varchar(255) [unique]
  email varchar(255) [unique]
  estado varchar(255)
  logradouro varchar(255)
  nome varchar(255)
  senha varchar(255)
  telefone varchar(255)
}

Table chamado {
  id bigint [primary key, increment]
  empresa_id bigint [ref: > entidade.id]
  tecnico_id bigint [ref: > entidade.id]
  numero int
  titulo varchar(255)
  observacoes varchar(255)
  data_abertura date
  data_fechamento date
  prioridade tinyint
  status tinyint
  bairro varchar(255)
  cep varchar(255)
  cidade varchar(255)
  complemento varchar(255)
  estado varchar(255)
  logradouro varchar(255)
  numero_chamado varchar(255)
}

Table form_finalizacao {
  id bigint [primary key, increment]
  chamado_id bigint [ref: > chamado.id, unique]
  foto_url varchar(255)
  observacoes varchar(255)
}

Table perfis {
  entidade_id bigint [not null, ref: > entidade.id]
  perfis int
}

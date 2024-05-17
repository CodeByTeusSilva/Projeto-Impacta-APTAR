import {Endereco} from "./endereco";

export interface TecnicoDtoinput {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: Endereco;
  cpf: string;
}



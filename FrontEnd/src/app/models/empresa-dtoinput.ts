import {Endereco} from "./endereco";

export interface EmpresaDTOinput {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  endereco: Endereco;
  cnpj: string;
}

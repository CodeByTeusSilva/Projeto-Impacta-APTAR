
import { Endereco } from "./endereco";

export class Chamado {
  id!: number;
  numeroChamado!: string;
  dataAbertura!: Date; // Use um tipo adequado para datas, como Date
  dataFechamento!: Date; // Use um tipo adequado para datas, como Date
  prioridade!: number;
  status!: number;
  titulo!: string;
  observacoes!: string;
  endereco!: Endereco; // Defina o modelo Endereco conforme necessário
  tecnico!: number;
  empresa!: number;
  nomeTecnico!: string;
  nomeEmpresa!: string;
}

import { AlertaSeguranca } from '../types/Registro';

export const alertasIniciais: AlertaSeguranca[] = [
  {
    id: "1718360000001",
    categoria: "Falta de EPI",
    descricao: "Operador identificado operando a serra fita sem luvas de proteção e óculos.",
    equipamentoFaltante: "Luvas e Óculos",
    gravidade: "critico",
    setorCamera: "Câmera 03 - Setor de Corte",
    dataHora: "14/06/2026 09:15",
    resolvido: false
  },
  {
    id: "1718360000002",
    categoria: "Postura Incorreta",
    descricao: "Risco ergonômico detectado. Colaborador levantando caixas dobrando a coluna incorretamente.",
    gravidade: "alerta",
    setorCamera: "Câmera 12 - Estoque B",
    dataHora: "14/06/2026 10:30",
    resolvido: false
  },
  {
    id: "1718360000003",
    categoria: "Invasão de Área de Risco",
    descricao: "Pessoa não autorizada ultrapassou a faixa amarela perto da empilhadeira em movimento.",
    gravidade: "critico",
    setorCamera: "Câmera 05 - Pátio de Carga",
    dataHora: "14/06/2026 11:45",
    resolvido: true
  },
  {
    id: "1718360000004",
    categoria: "Outros",
    descricao: "Ferramenta esquecida sobre o painel elétrico de alta tensão.",
    gravidade: "observacao",
    setorCamera: "Câmera 08 - Manutenção",
    dataHora: "14/06/2026 14:00",
    resolvido: false
  }
];
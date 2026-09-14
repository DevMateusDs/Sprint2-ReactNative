export type CategoriaRisco = "Falta de EPI" | "Postura Incorreta" | "Invasão de Área de Risco" | "Outros";

export type NivelGravidade = "observacao" | "alerta" | "critico";

export type AlertaSeguranca = {
  id: number;
  categoria: CategoriaRisco;
  descricao: string;
  equipamentoFaltante?: string;
  gravidade: NivelGravidade;
  setorCamera: string;
  dataHora: string;
  resolvido: boolean;
};
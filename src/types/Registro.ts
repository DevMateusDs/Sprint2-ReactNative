export type CategoriaRisco = "Falta de EPI" | "Postura Incorreta" | "Invasão de Área de Risco" | "Outros";

export type NivelGravidade = "observacao" | "alerta" | "critico";

export type AlertaSeguranca = {
  id: number;
  tipoRisco: string;
  localizacao: string;
  nivelPerigo: string;
  descricao: string;
};
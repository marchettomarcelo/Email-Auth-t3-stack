declare module "pessoa" {
    
  type AREAS = "FINANCEIRO" | "MARKETING" | "GP" | "PROJETOS";
  type PROJETOS =
    | "PONTUAIS"
    | "CAMISA10"
    | "SOMAR"
    | "SOCIAL"
    | "CHALLENGE"
    | "AULAS"
    | "VENUS"
    | "ALEGRARTE"
    | "AMBIENTAR"
    | "MUN"
    | "INFORMAR";

  type CARGOS = "DIRETOR" | "MEMBRO" | "LIDER";

  interface gasPerson {
    nome: string;
    email: string;
    cargo: CARGOS;
    areas: AREAS[];
    projetos: PROJETOS[];
  }
}

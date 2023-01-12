//import json file pessoas.json

import pessoasTeste from "./pessoas.json";

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

const pessoas = pessoasTeste as gasPerson[];

function allEmails() {
  return pessoas.map(({ email }) => email);
}

function allEmailsByArea(area: AREAS) {
  return pessoas
    .filter(({ areas }) => areas.includes(area))
    .map(({ email }) => email);
}

function allEmailsByProjeto(projeto: PROJETOS) {
  return pessoas
    .filter(({ projetos }) => projetos.includes(projeto))
    .map(({ email }) => email);
}

function allEmailsByCargo(cargo: CARGOS) {
  return pessoas
    .filter(({ cargo: c }) => c === cargo)
    .map(({ email }) => email);
}

function validEmails(email: string) {
  return pessoas.some(({ email: e }) => e === email);
}

function getPersonByEmail(email: string) {
  return pessoas.find(({ email: e }) => e === email);
}

export {
  allEmails,
  allEmailsByArea,
  allEmailsByProjeto,
  allEmailsByCargo,
  validEmails,
  getPersonByEmail,
};

import { PrismaClient } from "@prisma/client";
// gasPerson is a type defined in src/types/pessoa.d.ts

import Pessoas from "../src/utils/pessoas.json";

const prisma = new PrismaClient();

// Pessoas.map((pessoa) => {
//   console.log(pessoa.email.split("@")[0] as string);
// })


  (async function main() {
    const response = await prisma.profile.createMany({
      data: Pessoas.map((pessoa) => ({
        username: pessoa.email.split("@")[0] as string,
        nome: pessoa.nome as string,
        cargo: pessoa.cargo as any,
        areas: { set: pessoa.areas } as any,
        projetos: { set: pessoa.projetos } as any,
      })),
    });

    console.log(response);
  })();

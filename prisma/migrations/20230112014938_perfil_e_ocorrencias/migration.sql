-- CreateEnum
CREATE TYPE "AREAS" AS ENUM ('FINANCEIRO', 'MARKETING', 'GP', 'PROJETOS');

-- CreateEnum
CREATE TYPE "PROJETOS" AS ENUM ('PONTUAIS', 'CAMISA10', 'SOMAR', 'SOCIAL', 'CHALLENGE', 'AULAS', 'VENUS', 'ALEGRARTE', 'AMBIENTAR', 'MUN', 'INFORMAR');

-- CreateEnum
CREATE TYPE "CARGOS" AS ENUM ('DIRETOR', 'MEMBRO', 'LIDER');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projetos" "PROJETOS"[],
    "areas" "AREAS"[],
    "cargo" "CARGOS" NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ocorrencia" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "receptorId" TEXT NOT NULL,

    CONSTRAINT "Ocorrencia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ocorrencia_responsavelId_key" ON "Ocorrencia"("responsavelId");

-- CreateIndex
CREATE UNIQUE INDEX "Ocorrencia_receptorId_key" ON "Ocorrencia"("receptorId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

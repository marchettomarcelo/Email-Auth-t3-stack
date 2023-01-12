/*
  Warnings:

  - Added the required column `pontosGanhos` to the `Ocorrencia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ocorrencia" ADD COLUMN     "pontosGanhos" INTEGER NOT NULL;

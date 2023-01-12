-- DropForeignKey
ALTER TABLE "Ocorrencia" DROP CONSTRAINT "Ocorrencia_receptorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ocorrencia" ADD CONSTRAINT "Ocorrencia_receptorId_fkey" FOREIGN KEY ("receptorId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

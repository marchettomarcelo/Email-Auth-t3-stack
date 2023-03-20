//import prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
(async function main() {
  const allUsers = await prisma.profile.deleteMany();
  console.log(allUsers);
})();

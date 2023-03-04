import NextAuth, { type NextAuthOptions } from "next-auth";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { createTransport } from "nodemailer";
import { allEmails, getPersonByEmail } from "../../../utils/gamb";
import { prisma } from "../../../server/db";
import EmailProvider from "next-auth/providers/email";
import { type gasPerson } from "pessoa";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  events: {

    async createUser(message) {
      if (!message.user.email) return;


      const pessoa = getPersonByEmail(message.user.email) as gasPerson;

      const username = message.user.email.split("@")[0] as string;

      // check if user already exists

      const userExists = await prisma.profile.findUnique({
        where: { username: username },
      });

      if (userExists) {
        
        await prisma.profile.update({
          where: { username: username },
          data: {
            userId: message.user.id,
          },
        });
      } else {
        await prisma.profile.create({
          data: {
            username: username,
            nome: pessoa.nome,
            userId: message.user.id,
            cargo: pessoa.cargo,
            areas: { set: pessoa.areas },
            projetos: { set: pessoa.projetos },
          },
        });
      }
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async function ({
        identifier: email,
        url,
        provider: { server, from },
      }) {
        const { host } = new URL(url);
        const transport = createTransport(server);

        const validEmails = allEmails();
        if (validEmails.includes(email)) {
           
          const result = await transport.sendMail({
            to: email,
            from: from,
            subject: `Bem vindo ao site: ${host}`,
            text: `Sign in to ${host}\n\n${url}\n\n`,
          });

          const failed = result.rejected.concat(result.pending).filter(Boolean);
          
          if (failed.length) {
            throw new Error(
              `Email(s) (${failed.join(", ")}) could not be sent`
            );
          }
        }
      },
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);

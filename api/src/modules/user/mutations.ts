import { arg, mutationField, stringArg } from "@nexus/schema";
import { createSessionCookie } from "./utils";

export const createUser = mutationField("createUser", {
  type: "User",
  args: {
    input: arg({ type: "CreateUserInput", required: true }),
  },
  async resolve(_root, { input }, { prisma }) {
    return prisma.user.create({ data: { id: input.id } });
  },
});

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    idToken: stringArg({ required: true }),
    csrfToken: stringArg({ required: true }),
  },
  async resolve(_root, { idToken, csrfToken }, { req, res }) {
    await createSessionCookie({ req, res, idToken, csrfToken });
    return true;
  },
});

export const logout = mutationField("logout", {
  type: "Boolean",
  async resolve(_root, _args, { res }) {
    res.clearCookie("session");
    return true;
  },
});

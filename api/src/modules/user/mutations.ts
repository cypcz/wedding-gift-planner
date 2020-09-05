import { booleanArg, mutationField, stringArg } from "@nexus/schema";
import { firebaseAdmin } from "../../firebase";
import { createSessionCookie } from "./utils";

export const register = mutationField("register", {
  type: "Boolean",
  args: {
    email: stringArg({ required: true }),
    password: stringArg({ required: true }),
  },
  async resolve(_root, { email, password }, { prisma }) {
    const userRecord = await firebaseAdmin.createUser({ email, password });
    await prisma.user.create({ data: { id: userRecord.uid, email } });
    return true;
  },
});

export const login = mutationField("login", {
  type: "Boolean",
  args: {
    idToken: stringArg({ required: true }),
    csrfToken: stringArg({ required: true }),
    isProvider: booleanArg(),
  },
  async resolve(_root, { idToken, csrfToken, isProvider }, { req, res, prisma }) {
    if (isProvider) {
      try {
        const decodedToken = await firebaseAdmin.verifyIdToken(idToken);
        const user = await prisma.user.findOne({ where: { id: decodedToken.uid } });

        if (!user) {
          await prisma.user.create({ data: { id: decodedToken.uid, email: decodedToken.email! } });
        }
      } catch (e) {
        console.error(e);
        throw new Error();
      }
    }
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

import { PrismaClient } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import { createTestClient as _createTestClient } from "apollo-server-testing";
import { GraphQLResponse } from "apollo-server-types";
import { USER_1 } from "../prisma/seeds/users";
import { Context } from "../src/context";
import { schema } from "../src/schema";

export const prisma = new PrismaClient();

export const createTestClient = (ctx?: any) =>
  _createTestClient(
    new ApolloServer({
      schema,
      context: (): Context => ({
        user: { id: USER_1 },
        prisma,
        ...ctx,
      }),
    })
  );

export { GraphQLResponse };

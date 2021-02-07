import sgMail from "@sendgrid/mail";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import helmet from "helmet";
import "../generated/nexus";
import { ApiErrors, __prod__ } from "./constants";
import { createContext } from "./context";
import { schema } from "./schema";
import { checkEnvVars } from "./utils";

checkEnvVars();

sgMail.setApiKey(process.env.SG_KEY as string);

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => await createContext(req, res, sgMail),
  introspection: !__prod__,
  playground: !__prod__,
  formatError: (error) => {
    const errorKey = Object.keys(ApiErrors).find(
      (key) => ApiErrors[key] === error.message,
    );
    if (errorKey && error.extensions) {
      error.extensions.type = errorKey;
    }
    return error;
  },
});

const app = express();
__prod__ && app.use(helmet());

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.FE_URL,
  },
});

const port = process.env.PORT || 4001;

app.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  ),
);

import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import "../generated/nexus";
import { __prod__ } from "./constants";
import { createContext } from "./context";
import { schema } from "./schema";
import { checkEnvVars } from "./utils";

checkEnvVars();

const server = new ApolloServer({
  schema,
  context: async ({ req, res }) => await createContext(req, res),
  introspection: !__prod__,
  playground: !__prod__,
});

const app = express();
app.use(cookieParser());
__prod__ && app.use(helmet());
app.set("trust proxy", 1);

server.applyMiddleware({
  app,
  cors: {
    origin: process.env.FE_URLS?.split(","),
    credentials: true,
  },
});

const port = process.env.PORT || 4001;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
);

import { makeSchema } from "nexus";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import * as types from "./modules";

export const schema = makeSchema({
  types,
  plugins: [nexusPrisma()],
  outputs: {
    schema: path.join(__dirname, "../generated/schema.graphql"),
    typegen: path.join(__dirname, "../generated/nexus.ts"),
  },
  nonNullDefaults: { output: true },
  contextType: {
    module: require.resolve("./context"),
    export: "Context",
  },
});

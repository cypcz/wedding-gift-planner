import { decorateType } from "@nexus/schema";
import { GraphQLDate } from "graphql-scalars";

export const GQLDate = decorateType(GraphQLDate, { rootTyping: "Date", asNexusMethod: "date" });

export * from "./user";
export * from "./wedding";

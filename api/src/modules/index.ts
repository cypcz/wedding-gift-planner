import { arg } from "@nexus/schema";
import { GraphQLDate } from "graphql-iso-date";

export const dateArg = (options: any) => arg({ type: GraphQLDate, ...options });
export const dateTimeArg = (options: any) => arg({ type: "DateTime", ...options });

export * from "./user";
export * from "./wedding";

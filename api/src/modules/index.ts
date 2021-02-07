import { GraphQLDate } from "graphql-iso-date";
import { arg, enumType } from "nexus";
import { ApiErrors as ApiErrorsObj } from "../constants";

export const dateArg = (options: Record<string, unknown>) =>
  arg({ type: GraphQLDate, ...options });
export const dateTimeArg = (options: Record<string, unknown>) =>
  arg({ type: "DateTime", ...options });

export const ApiErrors = enumType({
  name: "ApiErrors",
  members: Object.keys(ApiErrorsObj),
});

export * from "./gift";
export * from "./guest";
export * from "./user";
export * from "./wedding";

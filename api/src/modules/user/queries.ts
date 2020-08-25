import { queryField } from "@nexus/schema";

export const me = queryField("me", {
  type: "Me",
  nullable: true,
  async resolve(_root, _args, { user }) {
    return user;
  },
});

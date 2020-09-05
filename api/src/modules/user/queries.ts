import { queryField } from "@nexus/schema";

export const me = queryField("me", {
  type: "User",
  nullable: true,
  async resolve(_root, _args, { user }) {
    return user;
  },
});

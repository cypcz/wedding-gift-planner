import { inputObjectType, objectType } from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id("id");
  },
});

export const Me = objectType({
  name: "Me",
  definition(t) {
    t.id("id", { nullable: false });
    t.string("email", { nullable: true });
  },
});

export const CreateUserInput = inputObjectType({
  name: "CreateUserInput",
  definition(t) {
    t.id("id", { required: true });
  },
});

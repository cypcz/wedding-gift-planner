import { inputObjectType, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.wedding();
    t.model.emailVerified();
    t.model.verificationResendLimit();
  },
});

export const RegisterInput = inputObjectType({
  name: "RegisterInput",
  definition(t) {
    t.nonNull.string("email");
    t.nonNull.string("password");
  },
});

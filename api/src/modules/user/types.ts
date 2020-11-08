import { inputObjectType, objectType } from "@nexus/schema";

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
    t.string("email", { required: true });
    t.string("password", { required: true });
    t.string("weddingId");
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInput",
  definition(t) {
    t.string("idToken", { required: true });
    t.string("csrfToken", { required: true });
    t.string("weddingId");
    t.boolean("isProvider");
  },
});

import { objectType } from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.wedding();
  },
});

export const Guest = objectType({
  name: "Guest",
  definition(t) {
    t.model.id();
    t.model.plusX();
    t.model.plusGuests();
    t.model.guestLink();
    t.model.user();
    t.model.wedding();
  },
});

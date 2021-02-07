import { inputObjectType, objectType } from "nexus";

export const Guest = objectType({
  name: "Guest",
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.plusX();
    t.model.plusGuests();
    t.model.status();
    t.model.wedding();
  },
});

export const UpsertGuestInput = inputObjectType({
  name: "UpsertGuestInput",
  definition(t) {
    t.id("id");
    t.nonNull.id("weddingId");
    t.nonNull.string("firstName");
    t.nonNull.string("lastName");
    t.int("plusX");
  },
});

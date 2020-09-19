import { inputObjectType, objectType } from "@nexus/schema";

export const Guest = objectType({
  name: "Guest",
  definition(t) {
    t.model.id();
    t.model.firstName();
    t.model.lastName();
    t.model.plusX();
    t.model.plusGuests();
    t.model.guestLink();
    t.model.status();
  },
});

export const UpsertGuestInput = inputObjectType({
  name: "UpsertGuestInput",
  definition(t) {
    t.id("id");
    t.id("weddingId", { required: true });
    t.string("firstName", { required: true });
    t.string("lastName", { required: true });
    t.int("plusX");
  },
});

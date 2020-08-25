import { objectType } from "@nexus/schema";

export const Wedding = objectType({
  name: "Wedding",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.gifts();
    t.model.guests();
  },
});

export const Gift = objectType({
  name: "Gift",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.wedding();
  },
});

import { inputObjectType, objectType } from "@nexus/schema";

export const Wedding = objectType({
  name: "Wedding",
  definition(t) {
    t.model.id();
    t.model.partner1Name();
    t.model.partner2Name();
    t.model.date();
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

export const UpsertWeddingInput = inputObjectType({
  name: "UpsertWeddingInput",
  definition(t) {
    t.id("id");
    t.string("partner1Name", { required: true });
    t.string("partner2Name", { required: true });
    t.string("partnersEmail");
    t.field("date", { type: "DateTime", required: true });
  },
});

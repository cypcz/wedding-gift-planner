import { inputObjectType, objectType } from "nexus";

export const Wedding = objectType({
  name: "Wedding",
  definition(t) {
    t.model.id();
    t.model.partner1Name();
    t.model.partner2Name();
    t.model.partnersEmail();
    t.model.date();
    t.model.rsvpUntil();
    t.model.location();
    t.model.gifts();
    t.model.guests();
    t.model.authors();
  },
});

export const UpsertWeddingInput = inputObjectType({
  name: "UpsertWeddingInput",
  definition(t) {
    t.id("id");
    t.nonNull.string("partner1Name");
    t.nonNull.string("partner2Name");
    t.nonNull.string("location");
    t.string("partnersEmail");
    t.nonNull.field("date", { type: "DateTime" });
    t.nonNull.field("rsvpUntil", { type: "DateTime" });
  },
});

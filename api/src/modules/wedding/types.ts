import { inputObjectType, objectType } from "@nexus/schema";

export const Wedding = objectType({
  name: "Wedding",
  definition(t) {
    t.model.id();
    t.model.partner1Name();
    t.model.partner2Name();
    t.model.partnersEmail();
    t.model.date();
    t.model.rsvpUntil();
    t.model.gifts();
    t.model.guests();
    t.model.authors();
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
    t.field("rsvpUntil", { type: "DateTime", required: true });
  },
});

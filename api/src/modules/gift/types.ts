import { inputObjectType, objectType } from "@nexus/schema";

export const Gift = objectType({
  name: "Gift",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.name();
    t.model.description();
    t.model.price();
    t.model.currency();
    t.model.link();
    t.model.imgUrl();
    t.model.contributions();
  },
});

export const GiftContribution = objectType({
  name: "GiftContribution",
  definition(t) {
    t.model.id();
    t.model.amount();
    t.model.currency();
    t.model.note();
    t.model.contributors();
    t.model.gift();
  },
});

export const UpsertGiftInput = inputObjectType({
  name: "UpsertGiftInput",
  definition(t) {
    t.id("id");
    t.id("weddingId", { required: true });
    t.string("name", { required: true });
    t.string("description");
    t.int("price", { required: true });
    t.field("currency", { type: "Currency", required: true });
    t.string("imgUrl");
    t.string("link");
  },
});

import { inputObjectType, objectType } from "nexus";

export const Gift = objectType({
  name: "Gift",
  definition(t) {
    t.model.id();
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
    t.model.contributor();
    t.model.gift();
  },
});

export const UpsertGiftInput = inputObjectType({
  name: "UpsertGiftInput",
  definition(t) {
    t.id("id");
    t.nonNull.id("weddingId");
    t.nonNull.string("name");
    t.string("description");
    t.nonNull.float("price");
    t.nonNull.field("currency", { type: "Currency" });
    t.string("imgUrl");
    t.string("link");
  },
});

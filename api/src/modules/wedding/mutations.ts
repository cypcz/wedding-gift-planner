import { mutationField } from "@nexus/schema";

export const createWedding = mutationField("createWedding", {
  type: "Wedding",
  args: {
    // input: arg({ type: "CreateUserInput", required: true }),
  },
  async resolve(_root, _args, { prisma }) {
    return prisma.wedding.create({ data: { name: "test" } });
  },
});

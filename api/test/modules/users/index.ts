import { expect } from "chai";
import * as faker from "faker";
import gql from "graphql-tag";
import { createTestClient, prisma } from "../../client";

describe("User tests try", () => {
  before(async () => {
    await prisma.user.deleteMany({});
    console.log("succesfully dumped all users and related blocks");
  });

  const { query, mutate } = createTestClient();

  const input = {
    id: faker.random.uuid(),
    name: faker.name.firstName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    address: {
      placeId: faker.random.uuid(),
    },
  };

  it("creates user", async () => {
    const createRes = await mutate({
      mutation: gql`
        mutation($input: UserCreateInput!) {
          createUser(input: $input) {
            id
          }
        }
      `,
      variables: { input },
    });

    expect(createRes.errors).to.be.undefined;
    expect(createRes.data?.createUser.id).to.exist;
  });
});

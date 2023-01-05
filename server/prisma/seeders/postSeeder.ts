import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/prisma";
import { randomInteger } from "../../src/utils/randomInteger";

const postSeeder = async (qty: number, numberOfUser: number): Promise<void> => {
  await prisma.post.deleteMany({});

  for (let i = 1; i <= qty; i++) {
    await prisma.post.create({
      data: {
        userId: randomInteger(1, numberOfUser),
        content: faker.random.words(randomInteger(1, 10)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }
};

export default postSeeder;

import { faker } from "@faker-js/faker";
import prisma from "../../src/utils/prisma";
import { randomInteger } from "../../src/utils/randomInteger";

const commentSeeder = async (
  qty: number,
  numberOfUser: number,
  numberOfPost: number
): Promise<void> => {
  await prisma.comment.deleteMany({});

  for (let i = 1; i <= qty; i++) {
    await prisma.comment.create({
      data: {
        userId: randomInteger(1, numberOfUser),
        postId: randomInteger(1, numberOfPost),
        content: faker.random.words(randomInteger(1, 10)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }
};

export default commentSeeder;

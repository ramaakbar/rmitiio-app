import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import prisma from "../../src/utils/prisma";

const userSeeder = async (qty: number): Promise<void> => {
  await prisma.user.deleteMany({});

  const hashPass = await bcrypt.hash(
    "password",
    parseInt(process.env.SALT_WORK_FACTOR as string)
  );

  for (let i = 1; i <= qty; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    await prisma.user.create({
      data: {
        email: faker.internet.email(firstName, lastName),
        username: faker.internet.userName(firstName, lastName),
        name: `${firstName} ${lastName}`,
        password: hashPass,
        picture: faker.image.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }
};

export default userSeeder;

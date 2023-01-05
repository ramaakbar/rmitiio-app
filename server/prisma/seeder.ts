import prisma from "../src/utils/prisma";
import commentSeeder from "./seeders/commentSeeder";
import postSeeder from "./seeders/postSeeder";
import userSeeder from "./seeders/userSeeder";

async function main() {
  const numberOfUser = 50;
  const numberOfPost = 150;
  const numberOfComment = 150;

  await userSeeder(numberOfUser);
  await postSeeder(numberOfPost, numberOfUser);
  await commentSeeder(numberOfComment, numberOfUser, numberOfPost);
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

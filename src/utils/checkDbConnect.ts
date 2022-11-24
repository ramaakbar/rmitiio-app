import prisma from "./prisma";

const checkDbConnect = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Connected to DB");
  } catch (error) {
    console.log("Could not connect to DB");
  }
};

export default checkDbConnect;

import crypto from "crypto";

export const randomImgName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

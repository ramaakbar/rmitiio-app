import crypto from "crypto";

export const randomImgName = (bytes = 8) =>
  crypto.randomBytes(bytes).toString("hex");

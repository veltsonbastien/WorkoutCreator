import argon2 from "argon2";

export const verifyPwd = async (
  pwd: string | null,
  hash: string,
): Promise<boolean> => {
  if (!pwd) return false;

  try {
    return await argon2.verify(hash, pwd);
  } catch (e) {
    console.error(e);
    return false;
  }
};

import argon2 from "argon2";

export const hashPwd = async (pwd: string): Promise<string | null> => {
  try {
    return await argon2.hash(pwd);
  } catch (e) {
    console.error(e);
    return null;
  }
};

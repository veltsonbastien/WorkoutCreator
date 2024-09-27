import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import { BasicUser } from "@/types";
import { hashPwd } from "../auth";

export const addUserToDb = async (user: BasicUser): Promise<User | null> => {
  const hashedPwd = await hashPwd(user.password);
  if (!hashedPwd) throw new Error("Error hashing password while signing up");

  try {
    return await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPwd,
      },
    });
  } catch (e) {
    console.error("Error creating user: ", e);
    return null;
  }
};

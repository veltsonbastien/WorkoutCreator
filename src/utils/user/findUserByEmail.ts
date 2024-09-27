import { User } from "@prisma/client";
import prisma from "@/lib/prisma";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (e) {
    console.error("Error finding user by email: ", e);
    return null;
  }
};

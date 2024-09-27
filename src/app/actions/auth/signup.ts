"use server";

import { signIn } from "@/auth";
import { addUserToDb } from "@/utils/user";

interface SignupResponse {
  error: string | undefined;
  redirect?: string;
}

export const signup = async (
  signupData: FormData,
): Promise<SignupResponse | undefined> => {
  const name = signupData.get("name") as string;
  const email = signupData.get("email") as string;
  const password = signupData.get("password") as string;
  const passwordConfirm = signupData.get("passwordConfirm") as string;

  const errors = getSignupFormErrors(name, email, password, passwordConfirm);
  if (errors)
    return {
      error: errors,
    };

  try {
    await addUserToDb({
      name,
      email,
      password,
    });

    //this will use the credentials provider specified in auth.ts
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!res.error) {
      return {
        redirect: "/",
        error: undefined,
      };
    } else {
      return {
        error: res.error,
      };
    }
  } catch (e) {
    console.error("Error adding user to db: ", e);
    return {
      error: `Error signing up: ${e}`,
    };
  }
};

const getSignupFormErrors = (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
): string | undefined => {
  if (!name || !email || !password || !passwordConfirm) {
    return "All fields are required";
  }

  if (password !== passwordConfirm) return "Passwords do not match";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (password.length < 6) return "Password must be at least 6 characters";

  return undefined;
};

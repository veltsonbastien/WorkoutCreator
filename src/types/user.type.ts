export interface BasicUser {
  name: string;
  email: string;
  password: string;
}

export type SignupUser = BasicUser & { passwordConfirm: string };

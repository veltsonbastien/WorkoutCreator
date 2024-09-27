"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { signup } from "../../../actions/auth";
import styles from "./SignupPageContent.module.scss";

export const SignupPageContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  //will eventually replace these with middlware
  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/");
    }
  }, [router, session, status]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const signupData = new FormData();
    signupData.append("name", name);
    signupData.append("email", email);
    signupData.append("password", password);
    signupData.append("passwordConfirm", passwordConfirm);

    signup(signupData).then((res) => {
      if (res?.error) {
        setError(res.error);
      } else {
        router.push(res?.redirect || "/");
      }
    });
  };

  return (
    <div>
      <h2> Sign Up </h2>
      <p> Get access to workout analytics </p>
      <form>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </form>
      {error ? <p>Errors submitting form: {error}</p> : null}
      <button type="button" onClick={handleSubmit}>
        Sign Up
      </button>
    </div>
  );
};

import { SessionProvider } from "next-auth/react";
import { SignupPageContent } from "./components";

export default function SignupPage() {
  return (
    <SessionProvider>
      <SignupPageContent />
    </SessionProvider>
  );
}

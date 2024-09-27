import { SessionProvider } from "next-auth/react";
import { BuildWorkoutPageContent } from "./components";

export default function BuildWorkoutPage() {
  return (
    <SessionProvider>
      <BuildWorkoutPageContent />
    </SessionProvider>
  );
}

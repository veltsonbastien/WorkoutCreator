import { SessionProvider } from "next-auth/react";
import { StartPageContent } from "./components";

export default function StartWorkoutPage() {
  return (
    <SessionProvider>
      <StartPageContent />
    </SessionProvider>
  );
}

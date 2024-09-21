"use client";

import { PageProvider } from "@/providers";
import { BuildWorkoutPageContent } from "./components";

export default function BuildWorkoutPage() {
  return (
    <PageProvider>
      <BuildWorkoutPageContent />
    </PageProvider>
  );
}

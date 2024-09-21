"use client";

import { PageProvider } from "@/providers";
import { StartPageContent } from "./components";

export default function Page() {
  return (
    <PageProvider>
      <StartPageContent />
    </PageProvider>
  );
}

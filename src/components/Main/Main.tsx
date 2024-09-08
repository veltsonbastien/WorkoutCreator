"use client";

import { PageProvider } from "@/providers";
import { MainContent } from "../MainContent";

export const Main = () => {
  return (
    <PageProvider>
      <MainContent />
    </PageProvider>
  );
};

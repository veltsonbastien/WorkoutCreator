import { Main } from "@/components/Main";
import { initializeDb } from "@/app/ai/data";

export default async function Home() {
  await initializeDb();

  return <Main />;
}

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  ReactNode,
} from "react";
import { RetrievedExercise } from "@/types";

interface PageContextProps {
  workout: RetrievedExercise[] | null;
  setWorkout: (w: RetrievedExercise[] | null) => void;
}

const PageContext = createContext<PageContextProps>({} as PageContextProps);

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const [workout, setWorkout] = useState<RetrievedExercise[] | null>(null);
  console.log("workout in provider: ", workout);

  const value = useMemo(
    () => ({
      workout,
      setWorkout,
    }),
    [workout],
  );

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);

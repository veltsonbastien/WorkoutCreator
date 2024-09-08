import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

interface PageContextProps {}

const PageContext = createContext<PageContextProps>({});

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider = ({ children }: PageProviderProps) => {
  const value = {};

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = () => useContext(PageContext);

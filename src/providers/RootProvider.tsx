import { ThemeProvider } from "./ThemeProvider";

type RootProviderProps = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: RootProviderProps) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default RootProvider;

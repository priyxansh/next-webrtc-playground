import SocketProvider from "./SocketProvider";
import { ThemeProvider } from "./ThemeProvider";

type RootProviderProps = {
  children: React.ReactNode;
};

const RootProvider = ({ children }: RootProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SocketProvider>{children}</SocketProvider>
    </ThemeProvider>
  );
};

export default RootProvider;

import { ThemeProvider } from "../context/ThemeContext";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;

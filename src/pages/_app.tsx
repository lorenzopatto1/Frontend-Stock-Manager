import { AppProps } from "next/app";
import { AppProvider } from "../providers";
import '../global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
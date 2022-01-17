import "../styles/globals.css";
import "../styles/components/index.css";
import "../styles/media/index.css";
import "../styles/pages/index.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import AuthProvider from "../providers/auth";
import { ToastContainer } from "react-toastify";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </AuthProvider>
  );
}

export default MyApp;

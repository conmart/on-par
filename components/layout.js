import Head from "next/head";
import { AuthProvider } from "../services/auth";
import NavBar from "./navBar";

export default function Layout({ children, title = 'OnPar' }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <NavBar />
        {children}
      </AuthProvider>
    </div>
  );
}
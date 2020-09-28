import { Box } from '@chakra-ui/core';
import Head from 'next/head';
import { AuthProvider } from '../services/auth';
import NavBar from './navBar';

export default function Layout({ children, title = 'OnPar' }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthProvider>
        <NavBar />
        <Box p={4}>
          <Box maxW={1000} m="auto">
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </div>
  );
}

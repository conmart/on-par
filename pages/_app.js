import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { customTheme } from '../styles/theme';

import '../styles/globals.css';
import { AuthProvider } from '../services/auth';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;

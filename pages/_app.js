import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { customTheme } from '../styles/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;

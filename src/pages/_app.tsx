import React from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';

import GlobalStyles from '../components/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar categories={["electronics", "jewelry", "men's clothing", "women's clothing"]} />
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

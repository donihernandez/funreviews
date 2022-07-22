import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { Layout } from '@/components/Layout';

import '@/styles/globals.css';
import { ShowsProvider } from 'contexts/ShowsContext';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <RecoilRoot>
                <ShowsProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ShowsProvider>
            </RecoilRoot>
        </ChakraProvider>
    );
}

export default MyApp;

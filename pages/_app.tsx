import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';

import { Layout } from '@/components/Layout';

import '@/styles/globals.css';
import { ShowsProvider } from 'contexts/ShowsContext';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ChakraProvider>
                    <ShowsProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ShowsProvider>
                </ChakraProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;

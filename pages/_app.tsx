import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';

import { ShowsProvider } from 'contexts/ShowsContext';
import '@/styles/globals.css';
import { NOT_LAYOUT_ROUTES } from '../utils';

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ChakraProvider>
                    <ShowsProvider>
                        {!NOT_LAYOUT_ROUTES.includes(router.pathname) ? (
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        ) : (
                            <Component {...pageProps} />
                        )}
                    </ShowsProvider>
                </ChakraProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;

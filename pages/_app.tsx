import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
    DehydratedState,
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';

import Layout from '@/components/Layout/Layout';

import '@/styles/globals.css';
import { NOT_LAYOUT_ROUTES } from '../utils';
import { ShowsProvider } from 'contexts/ShowsContext';
import { AuthProvider } from 'contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function MyApp({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient] = useState(() => new QueryClient());

    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
                <ChakraProvider>
                    <ShowsProvider>
                        <AuthProvider>
                            {!NOT_LAYOUT_ROUTES.includes(router.pathname) ? (
                                <>
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                    <Analytics />
                                </>
                            ) : (
                                <>
                                    <Component {...pageProps} />
                                    <Analytics />
                                </>
                            )}
                        </AuthProvider>
                    </ShowsProvider>
                </ChakraProvider>
            </Hydrate>
            <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
    );
}

export default MyApp;

import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import {
    DehydratedState,
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Layout } from '@/components/Layout';

import '@/styles/globals.css';
import { NOT_LAYOUT_ROUTES } from '../utils';
import { ShowsProvider } from 'contexts/ShowsContext';
import { AuthProvider } from 'contexts/AuthContext';
import { Transition } from '@/components/common/Transition';

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
                    <Transition>
                        <ShowsProvider>
                            <AuthProvider>
                                {!NOT_LAYOUT_ROUTES.includes(
                                    router.pathname,
                                ) ? (
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                ) : (
                                    <Component {...pageProps} />
                                )}
                            </AuthProvider>
                        </ShowsProvider>
                    </Transition>
                </ChakraProvider>
            </Hydrate>
        </QueryClientProvider>
    );
}

export default MyApp;

import { Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loading } from '../common/Loading';

export default function Home() {
    // Dynamic Imports
    const Hero = dynamic(() => import('./Hero/Hero'), {
        ssr: false,
    });
    const Trending = dynamic(() => import('./Trending/Trending'), {
        suspense: true,
    });
    const PopularMovies = dynamic(
        () => import('./PopularMovies/PopularMovies'),
        {
            suspense: true,
        },
    );
    const TopRatedMovies = dynamic(
        () => import('./TopRatedMovies/TopRatedMovies'),
        {
            suspense: true,
        },
    );
    const PopularTv = dynamic(() => import('./PopularTv/PopularTv'), {
        suspense: true,
    });
    const TopRatedTv = dynamic(() => import('./TopRatedTv/TopRatedTv'), {
        suspense: true,
    });

    return (
        <Flex bg="#000" direction="column" w="full">
            <Hero />
            <Suspense fallback={<Loading />}>
                <Trending />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <PopularMovies />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <TopRatedMovies />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <PopularTv />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <TopRatedTv />
            </Suspense>
        </Flex>
    );
}

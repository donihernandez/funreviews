import { Flex } from '@chakra-ui/react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import type { NextPage } from 'next';

import { ShowsContainer } from '@/components/common/ShowsContainer';
import { COLORS } from '@/styles/theme';
import { Hero } from '../components/Hero';
import { getMovieGenres, getUpcoming } from '@/api/movies/queries';
import { getGenres } from '../utils';

const Home: NextPage = () => {
    const { data, isLoading } = useQuery('upcoming', getUpcoming);
    const { data: genres } = useQuery('genres', getMovieGenres);

    const genresToShow = getGenres(data?.results, genres);

    return (
        <Flex bg="#000" direction="column">
            <Hero />
            <ShowsContainer
                filters={genresToShow}
                isLoading={isLoading}
                items={data.results}
                link="/movies"
                title="Upcoming Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
            />
        </Flex>
    );
};

export async function getServerSideProps() {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery('upcoming', getUpcoming);
    await queryClient.prefetchQuery('genres', getMovieGenres);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export default Home;

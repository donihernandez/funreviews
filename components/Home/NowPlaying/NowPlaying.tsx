import { Container, Heading } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { getNowPlaying } from '_tmdb/movies/queries';
import { SlideShow } from '@/components/common/SlideShow';
import { COLORS } from '@/styles/theme';
import { Loading } from '@/components/common/Loading';

const NowPlaying = () => {
    const { data: nowPlaying, isLoading } = useQuery(
        'nowPlaying',
        getNowPlaying,
    );

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            minH="100vh"
            p="100px 0"
        >
            <Heading
                as="h2"
                color={COLORS.white}
                fontFamily="Nunito"
                fontSize="30px"
                mb={4}
            >
                Now Playing
            </Heading>
            {isLoading ? (
                <Loading />
            ) : (
                <SlideShow movies={nowPlaying?.results} />
            )}
        </Container>
    );
};

export { NowPlaying };

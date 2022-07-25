import { FC, useEffect, useState } from 'react';
import {
    Button,
    chakra,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Wrapper } from '../common/Wrapper';
import {
    getMovieCredits,
    getMovieDetails,
    getMovieReviews,
    getVideos,
    getWatchProviders,
} from '_tmdb/movies/queries';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';

import { getTrailer } from '@/utils/getTrailer';
import { StarIcon } from '@chakra-ui/icons';
import {
    CastContainer,
    CrewContainer,
    MoviePoster,
    MovieTrailer,
    ProductionCompaniesContainer,
} from './MovieDetails.components';
import { Badge } from '../common/Badge';
import { FaPlay } from 'react-icons/fa';
import { Review } from '../common/Review';
import { VideoBox } from '../common/VideoBox';
import { useBreakpoints } from 'hooks';

const MovieDetails: FC = () => {
    const router = useRouter();

    const { isSmallerThanDesktop } = useBreakpoints();

    const wrapperStyles = {
        minH: '200vh',
    };

    const [movieTrailer, setMovieTrailer] = useState('');

    const { id } = router.query;

    const size = isSmallerThanDesktop
        ? IMAGE_CONFIG.poster_sizes.find(s => s === 'original')
        : IMAGE_CONFIG.backdrop_sizes.find(s => s === 'original');

    const { data: movieDetails } = useQuery(['movieDetails', id], () =>
        getMovieDetails(id as string),
    );
    const date = new Date(movieDetails.release_date).toDateString();

    const { data: movieCredits } = useQuery(['movieCredits', id], () =>
        getMovieCredits(id as string),
    );

    const { data: movieReviews } = useQuery(['movieReviews', id], () =>
        getMovieReviews(id as string),
    );

    const { data: movieVideos } = useQuery(['movieVideos', id], () =>
        getVideos(id as string),
    );

    const imagePath = isSmallerThanDesktop
        ? movieDetails?.poster_path
        : movieDetails?.backdrop_path;

    const image = `${IMAGE_URL}${size}${imagePath}`;

    const tabListStyles = {
        _active: {
            color: COLORS.orange,
        },
        _selected: {
            color: COLORS.orange,
        },
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const handleGetVideo = async () => {
        const trailer = getTrailer(movieVideos?.results);
        setMovieTrailer(trailer);
    };

    const getGenres = () => {
        return movieDetails.genres.map(genre => genre.name);
    };

    useEffect(() => {
        handleGetVideo();
    }, [movieVideos]);

    return (
        <Wrapper {...wrapperStyles}>
            <Flex direction="column" paddingTop="100px" position="relative">
                <MoviePoster
                    image={image}
                    title={movieDetails.original_title}
                />

                <Flex
                    alignItems="center"
                    direction={['column', null, 'row']}
                    justifyContent="center"
                    paddingY="50px"
                >
                    <MovieTrailer video={movieTrailer} />
                    <Flex direction="column" ml={['0', null, '30px']}>
                        <Heading
                            _hover={{
                                color: COLORS.orange,
                            }}
                            as="h1"
                            color={COLORS.white}
                            cursor="pointer"
                            fontFamily="Lato"
                            fontSize="4xl"
                            fontWeight="bold"
                        >
                            {movieDetails.title}
                        </Heading>
                        <Flex alignItems="center" my="10px">
                            <StarIcon color="yellow.400" mr="5px" />
                            <Text
                                color={COLORS.white}
                                fontFamily="Nunito"
                                fontSize="12px"
                            >
                                <chakra.span fontSize="16px" fontWeight="800">
                                    {movieDetails.vote_average}
                                </chakra.span>
                                /10
                            </Text>
                        </Flex>
                        <Text
                            color={COLORS.white}
                            fontFamily="Nunito"
                            fontSize="15px"
                            textAlign="justify"
                        >
                            {movieDetails.overview}
                        </Text>

                        <Divider color={COLORS.white} my="15px" />

                        <Flex>
                            <Text color={COLORS.white} fontWeight="extrabold">
                                Budget:{' '}
                                <chakra.span fontWeight="light">
                                    ${movieDetails.budget}
                                </chakra.span>
                            </Text>
                            <Divider
                                color={COLORS.white}
                                mx="10px"
                                orientation="vertical"
                            />
                            <Text color={COLORS.white} fontWeight="extrabold">
                                Release Date:{' '}
                                <chakra.span fontWeight="light">
                                    {date}
                                </chakra.span>
                            </Text>
                        </Flex>

                        <Divider color={COLORS.white} my="15px" />

                        <Wrap spacingX="5px">
                            {getGenres()?.length > 0 &&
                                getGenres()?.map(
                                    (genre: string, index: number) => {
                                        return (
                                            <WrapItem key={index}>
                                                <Badge
                                                    genre={genre?.toLowerCase()}
                                                >
                                                    #{genre}
                                                </Badge>
                                            </WrapItem>
                                        );
                                    },
                                )}
                        </Wrap>

                        <ProductionCompaniesContainer
                            companies={movieDetails.production_companies}
                        />

                        <Button
                            _hover={{
                                bg: COLORS.primary,
                            }}
                            as="a"
                            bg={COLORS.orange}
                            borderRadius="0"
                            color={COLORS.white}
                            cursor="pointer"
                            href={movieDetails.homepage}
                            leftIcon={<FaPlay />}
                            mt="15px"
                            target="_blank"
                            transition="all 0.5s ease-in-out"
                        >
                            Watch Now
                        </Button>
                    </Flex>
                </Flex>
            </Flex>

            <Flex w="full">
                <Tabs w="full">
                    <TabList>
                        <Tab {...tabListStyles}>Reviews</Tab>
                        <Tab {...tabListStyles}>Cast & Crew</Tab>
                        <Tab {...tabListStyles}>Videos</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Flex direction="column">
                                {movieReviews.results.map(review => (
                                    <Review key={review.id} review={review} />
                                ))}
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <Flex direction="column">
                                <CastContainer castList={movieCredits?.cast} />
                                <Divider color={COLORS.white} my="30px" />
                                <CrewContainer crewList={movieCredits?.crew} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <SimpleGrid
                                columns={[1, 1, 2, 2]}
                                mt="20px"
                                spacingX="20px"
                            >
                                {movieVideos?.results.map(video => (
                                    <VideoBox
                                        key={video.id}
                                        video={video.key}
                                    />
                                ))}
                            </SimpleGrid>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Wrapper>
    );
};

export { MovieDetails };

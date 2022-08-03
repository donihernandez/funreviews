import { FC, useEffect, useMemo, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Divider,
    Flex,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Wrapper } from '../../common/Wrapper';
import {
    getMovieCredits,
    getMovieDetails,
    getMovieReviews,
    getRecommendations,
    getVideos,
} from '_tmdb/movies/queries';
import { IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';

import { getTrailer } from '@/utils/getTrailer';

import { MovieBudgetAndReleaseDate } from './MovieDetails.components';

import { FaPlay } from 'react-icons/fa';

import { VideoBox } from '../../common/VideoBox';
import { useBreakpoints } from 'hooks';
import { ShowsContainer } from '../../common/Shows/ShowsContainer';
import { GenresList } from '../../common/GenreList';
import { Loading } from '../../common/Loading';
import {
    AdditionalInfo,
    CastContainer,
    CrewContainer,
    Description,
    DetailsContainer,
    InfoContainer,
    Poster,
    ProductionCompaniesContainer,
    Rate,
    ReviewsList,
    Title,
    Trailer,
} from '../Details.components';

interface IBreadcrumb {
    link: string;
    name: string;
    isCurrentPage?: boolean;
}

const MovieDetails: FC = () => {
    const router = useRouter();

    const { isSmallerThanDesktop } = useBreakpoints();

    const wrapperStyles = {
        minH: '200vh',
        paddingBottom: '100px',
    };

    const [movieTrailer, setMovieTrailer] = useState('');

    const { id } = router.query;

    const { data: movieDetails, isSuccess: movieDetailsSuccess } = useQuery(
        ['movieDetails', id],
        () => getMovieDetails(id as string),
    );

    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            link: '/movies',
            name: 'Movies',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: movieDetails?.title,
        },
    ];

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

    const { data: movieRecommendations } = useQuery(
        ['movieRecommendations', id],
        () => getRecommendations(id as string),
    );

    const getImagePath = useMemo(() => {
        let imagePath = '';
        if (!isSmallerThanDesktop) {
            imagePath = movieDetails.backdrop_path
                ? movieDetails.backdrop_path
                : movieDetails.poster_path;
        } else {
            imagePath = movieDetails.poster_path;
        }

        if (imagePath !== '') {
            return `${IMAGE_URL}original${imagePath}`;
        }

        return '';
    }, [movieDetailsSuccess]);

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

    const getGenres = (): string[] => {
        return movieDetails.genres.map(genre => genre.name);
    };

    useEffect(() => {
        handleGetVideo();
    }, [movieVideos]);

    return (
        <Wrapper {...wrapperStyles}>
            <Flex direction="column" paddingTop="100px" position="relative">
                <Flex w="full">
                    <Breadcrumb color={COLORS.white} my={6}>
                        {breadcrumbs.map(
                            (breadcrumb: IBreadcrumb, index: number) => {
                                return (
                                    <BreadcrumbItem
                                        _hover={{
                                            color: !breadcrumb.isCurrentPage
                                                ? COLORS.orange
                                                : '#fff',
                                        }}
                                        isCurrentPage={breadcrumb.isCurrentPage}
                                        key={index}
                                    >
                                        <BreadcrumbLink href={breadcrumb.link}>
                                            {breadcrumb.name}
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                );
                            },
                        )}
                    </Breadcrumb>
                </Flex>
                {getImagePath !== '' ? (
                    <Poster
                        image={getImagePath}
                        title={movieDetails.original_title}
                    />
                ) : (
                    <Loading />
                )}

                <DetailsContainer>
                    <Trailer video={movieTrailer} />
                    <InfoContainer>
                        <Title title={movieDetails.title} />
                        <Rate vote_average={movieDetails.vote_average} />
                        <Description overview={movieDetails.overview} />
                        <Divider color={COLORS.white} my="15px" />

                        <MovieBudgetAndReleaseDate
                            budget={movieDetails.budget}
                            date={date}
                        />

                        <Divider color={COLORS.white} my="15px" />
                        <GenresList getGenres={getGenres()} />
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
                    </InfoContainer>
                </DetailsContainer>
            </Flex>

            <AdditionalInfo>
                <Tabs w="full">
                    <TabList>
                        <Tab {...tabListStyles}>Reviews</Tab>
                        <Tab {...tabListStyles}>Cast & Crew</Tab>
                        <Tab {...tabListStyles}>Videos</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <ReviewsList reviews={movieReviews.results} />
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
            </AdditionalInfo>

            <ShowsContainer
                items={movieRecommendations?.results}
                link="/movies"
                title="Related Movies"
                titleStyles={{
                    color: COLORS.white,
                }}
                type="movie"
            />
        </Wrapper>
    );
};

export { MovieDetails };

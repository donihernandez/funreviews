import { FC, useMemo } from 'react';
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
import { Wrapper } from '../../common/Wrapper';
import { IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';

import { MovieBudgetAndReleaseDate } from './MovieDetails.components';

import { FaPlay } from 'react-icons/fa';

import { VideoBox } from '../../common/VideoBox';
import { useBreakpoints } from 'hooks';
import { ShowsContainer } from '../../common/Shows/ShowsContainer';
import { GenresList } from '../../common/GenreList';
import {
    AdditionalInfo,
    CastContainer,
    CrewContainer,
    Description,
    DetailsContainer,
    FunReviewsList,
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

interface IMovieDetailsProps {
    breadcrumbs: IBreadcrumb[];
    date: string;
    funReviews: any;
    movieCredits: any;
    movieDetails: any;
    movieRecommendations: any;
    movieReviews: any;
    movieVideos: any;
    trailer: string;
}

const MovieDetails: FC<IMovieDetailsProps> = ({
    breadcrumbs,
    date,
    funReviews,
    movieCredits,
    movieDetails,
    movieRecommendations,
    movieReviews,
    movieVideos,
    trailer,
}) => {
    const { isSmallerThanDesktop } = useBreakpoints();

    const wrapperStyles = {
        minH: '200vh',
        paddingBottom: '100px',
    };

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
    }, []);

    const tabListStyles = {
        _active: {
            color: COLORS.orange,
        },
        _selected: {
            color: COLORS.orange,
        },
        color: COLORS.white,
        cursor: 'pointer',
        fontFamily: 'Nunito',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const getGenres = (): string[] => {
        return movieDetails.genres.map(genre => genre.name);
    };

    return (
        <Wrapper {...wrapperStyles}>
            <Flex direction="column" paddingTop="100px">
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

                <Trailer video={trailer} />

                <DetailsContainer>
                    <Flex>
                        <Poster
                            image={getImagePath}
                            title={movieDetails.original_title}
                        />
                    </Flex>

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
                            {funReviews && (
                                <FunReviewsList funReviews={funReviews} />
                            )}

                            <ReviewsList reviews={movieReviews.results} />
                        </TabPanel>
                        <TabPanel>
                            <Flex direction="column">
                                <CastContainer castList={movieCredits.cast} />
                                <Divider color={COLORS.white} my="30px" />
                                <CrewContainer crewList={movieCredits.crew} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <SimpleGrid
                                columns={[1, 1, 2, 2]}
                                mt="20px"
                                spacingX="20px"
                            >
                                {movieVideos.results.map(video => (
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

            {movieRecommendations?.results.length > 0 && (
                <ShowsContainer
                    items={movieRecommendations?.results}
                    link="/movies"
                    title="Related Movies"
                    titleStyles={{
                        color: COLORS.white,
                    }}
                    type="movie"
                />
            )}
        </Wrapper>
    );
};

export { MovieDetails };

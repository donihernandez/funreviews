import { FC, useCallback, useEffect, useState } from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Flex,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { Wrapper } from '../../common/Wrapper';
import { COLORS } from '@/styles/theme';

import { ShowsContainer } from '../../common/Shows/ShowsContainer';
import {
    AdditionalInfo,
    CastContainer,
    CrewContainer,
    ReviewsList,
} from '../Details.components';
import Details from './Details';
import { useQuery } from '@tanstack/react-query';
import { getVideos } from '_tmdb/movies/queries';
import { getTrailer } from '@/utils/getTrailer';
import { useRouter } from 'next/router';
import Trailer from '../Trailer';

interface IBreadcrumb {
    link: string;
    name: string;
    isCurrentPage?: boolean;
}

interface IMovieDetailsProps {
    movieCredits: any;
    movieDetails: any;
    movieRecommendations: any;
    movieReviews: any;
}

const MovieDetails: FC<IMovieDetailsProps> = ({
    movieCredits,
    movieDetails,
    movieRecommendations,
    movieReviews,
}) => {
    const router = useRouter();
    const { id } = router.query;
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

    const [movieTrailer, setMovieTrailer] = useState('');

    const { data: movieVideos, isSuccess: movieVideosSuccess } = useQuery(
        ['movieVideos', id],
        () => getVideos(id as string),
    );

    const wrapperStyles = {
        minH: '200vh',
        paddingBottom: '100px',
    };

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

    const handleGetVideo = useCallback(async () => {
        const trailer = getTrailer(movieVideos?.results);
        setMovieTrailer(trailer);
    }, [movieVideos]);

    useEffect(() => {
        if (movieVideosSuccess && movieVideos.results.length > 0) {
            handleGetVideo();
        }
    }, [movieVideosSuccess, movieVideos]);

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

                {movieTrailer && <Trailer video={movieTrailer} />}

                <Details />
            </Flex>

            <AdditionalInfo>
                <Tabs w="full">
                    <TabList>
                        <Tab {...tabListStyles}>Reviews</Tab>
                        <Tab {...tabListStyles}>Cast & Crew</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {/* {funReviews && (
                                <FunReviewsList funReviews={funReviews} />
                            )} */}

                            <ReviewsList reviews={movieReviews.results} />
                        </TabPanel>
                        <TabPanel>
                            <Flex direction="column">
                                <CastContainer castList={movieCredits.cast} />
                                <Divider color={COLORS.white} my="30px" />
                                <CrewContainer crewList={movieCredits.crew} />
                            </Flex>
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

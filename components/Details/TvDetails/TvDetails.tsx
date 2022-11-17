/* eslint-disable max-len */
import { FC, useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Wrapper } from '@/components/common/Wrapper';
import { getTrailer } from '@/utils/getTrailer';
import { COLORS } from '@/styles/theme';
import { SeasonCard } from './SeasonCard';
import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
import Trailer from '../Trailer';
import Details from './Details';
import { getTvVideos } from '_tmdb/tv/queries';
import {
    AdditionalInfo,
    CastContainer,
    CrewContainer,
    ReviewsList,
} from '../Details.components';

interface IBreadcrumb {
    link: string;
    name: string;
    isCurrentPage?: boolean;
}

interface ITvDetailsProps {
    tvCredits: any;
    tvDetails: any;
    tvRecommendations: any;
    tvReviews: any;
}

const TvDetails: FC<ITvDetailsProps> = ({
    tvCredits,
    tvDetails,
    tvRecommendations,
    tvReviews,
}) => {
    const router = useRouter();
    const { id } = router.query;

    const [trailer, setTrailer] = useState(null);

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
        fontFamily: 'Nunito',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            link: '/tv-shows',
            name: 'Tv Shows',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: tvDetails?.name,
        },
    ];

    const { data: tvVideos, isSuccess } = useQuery(['tvVideos', id], () =>
        getTvVideos(id as string),
    );

    const handleGetVideo = async () => {
        const trailer = getTrailer(tvVideos?.results);
        setTrailer(trailer);
    };

    useEffect(() => {
        if (isSuccess && tvVideos.results.length > 0) {
            handleGetVideo();
        }
    }, [tvVideos]);

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

                {trailer && <Trailer video={trailer} />}

                <Details />
            </Flex>

            <Flex direction="column" mb="50px" w="full">
                <Heading
                    as="h2"
                    color={COLORS.white}
                    fontFamily="Nunito"
                    fontSize="30px"
                    mb="20px"
                    textAlign={['center', null, 'initial']}
                >
                    Seasons
                </Heading>
                <SimpleGrid columns={[1, 2, 3, 4]} gap={5}>
                    {tvDetails?.seasons?.map(season => (
                        <SeasonCard
                            key={season.id}
                            link={`
                                /tv-shows/${tvDetails.id}/season/${season.season_number}
                                `}
                            season={season}
                        />
                    ))}
                </SimpleGrid>
            </Flex>

            <AdditionalInfo>
                <Tabs w="full">
                    <TabList>
                        <Tab {...tabListStyles}>Reviews</Tab>
                        <Tab {...tabListStyles}>Cast & Crew</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <ReviewsList reviews={tvReviews?.results} />
                        </TabPanel>
                        <TabPanel>
                            <Flex direction="column">
                                <CastContainer castList={tvCredits?.cast} />
                                <Divider color={COLORS.white} my="30px" />
                                <CrewContainer crewList={tvCredits?.crew} />
                            </Flex>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </AdditionalInfo>

            {tvRecommendations?.results.length > 0 && (
                <ShowsContainer
                    items={tvRecommendations?.results}
                    link="/tv-shows"
                    title="Related TV Shows"
                    titleStyles={{
                        color: COLORS.white,
                    }}
                    type="tv"
                />
            )}
        </Wrapper>
    );
};

export { TvDetails };

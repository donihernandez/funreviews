/* eslint-disable max-len */
import { FC, useEffect } from 'react';
import { useMemo, useState } from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
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
import dynamic from 'next/dynamic';

import { useBreakpoints } from 'hooks';
import { Wrapper } from '@/components/common/Wrapper';
import { IMAGE_URL } from '@/utils/images';
import { getTrailer } from '@/utils/getTrailer';
import { COLORS } from '@/styles/theme';
import { GenresList } from '@/components/common/GenreList';
import { FaPlay } from 'react-icons/fa';
import { SeasonCard } from './SeasonCard';
import { VideoBox } from '@/components/common/VideoBox';
import { ShowsContainer } from '@/components/common/Shows/ShowsContainer';
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
    tvVideos: any;
}

const TvDetails: FC<ITvDetailsProps> = ({
    tvCredits,
    tvDetails,
    tvRecommendations,
    tvReviews,
    tvVideos,
}) => {
    const Trailer = dynamic(() =>
        import('../Details.components').then(module => module.Trailer),
    );

    const AdditionalInfo = dynamic(() =>
        import('../Details.components').then(module => module.AdditionalInfo),
    );

    const CastContainer = dynamic(() =>
        import('../Details.components').then(module => module.CastContainer),
    );

    const CrewContainer = dynamic(() =>
        import('../Details.components').then(module => module.CrewContainer),
    );

    const Description = dynamic(() =>
        import('../Details.components').then(module => module.Description),
    );

    const ReviewsList = dynamic(() =>
        import('../Details.components').then(module => module.ReviewsList),
    );
    const InfoContainer = dynamic(() =>
        import('../Details.components').then(module => module.InfoContainer),
    );
    const Title = dynamic(() =>
        import('../Details.components').then(module => module.Title),
    );
    const DetailsContainer = dynamic(() =>
        import('../Details.components').then(module => module.DetailsContainer),
    );
    const ProductionCompaniesContainer = dynamic(() =>
        import('../Details.components').then(
            module => module.ProductionCompaniesContainer,
        ),
    );
    const Rate = dynamic(() =>
        import('../Details.components').then(module => module.Rate),
    );

    const Poster = dynamic(() =>
        import('../Details.components').then(module => module.Poster),
    );

    const [trailer, setTrailer] = useState('');

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

    const getImagePath = useMemo(() => {
        const imagePath = tvDetails?.poster_path;

        if (imagePath !== '') {
            return `${IMAGE_URL}w780${imagePath}`;
        }

        return '';
    }, []);

    const date = new Date(tvDetails?.first_air_date).toDateString();

    const handleGetVideo = async () => {
        const trailer = getTrailer(tvVideos?.results);
        setTrailer(trailer);
    };

    const getGenres = (): string[] => {
        return tvDetails?.genres.map(genre => genre.name);
    };

    useEffect(() => {
        handleGetVideo();
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

                <Flex h="full" w="full">
                    <Trailer video={trailer} />
                </Flex>

                <DetailsContainer>
                    <Flex>
                        <Poster
                            image={getImagePath}
                            title={tvDetails?.original_name}
                        />
                    </Flex>

                    <InfoContainer>
                        <Title title={tvDetails?.name} />
                        <Rate vote_average={tvDetails?.vote_average} />
                        <Description overview={tvDetails?.overview} />
                        <Divider color={COLORS.white} my="15px" />
                        <Text color={COLORS.white} fontWeight="extrabold">
                            First Air Date:{' '}
                            <chakra.span fontWeight="light">{date}</chakra.span>
                        </Text>
                        <Divider color={COLORS.white} my="15px" />
                        <GenresList getGenres={getGenres()} />
                        <Divider color={COLORS.white} my="15px" />
                        <ProductionCompaniesContainer
                            companies={tvDetails?.production_companies}
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
                            href={tvDetails?.homepage}
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
                <Wrap justify="center">
                    {tvDetails?.seasons?.map(season => (
                        <WrapItem key={season.id}>
                            <SeasonCard
                                link={`
                                /tv-shows/${tvDetails.id}/season/${season.season_number}
                                `}
                                season={season}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
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
                            <ReviewsList reviews={tvReviews?.results} />
                        </TabPanel>
                        <TabPanel>
                            <Flex direction="column">
                                <CastContainer castList={tvCredits?.cast} />
                                <Divider color={COLORS.white} my="30px" />
                                <CrewContainer crewList={tvCredits?.crew} />
                            </Flex>
                        </TabPanel>
                        <TabPanel>
                            <SimpleGrid
                                columns={[1, 1, 2, 2]}
                                mt="20px"
                                spacingX="20px"
                                spacingY="20px"
                            >
                                {tvVideos?.results.map(video => (
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

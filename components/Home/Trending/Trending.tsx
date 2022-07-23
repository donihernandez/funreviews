import { FC, useMemo } from 'react';
import { useEffect, useState } from 'react';

import {
    Button,
    chakra,
    Container,
    Divider,
    Flex,
    Heading,
    Text,
    Wrap,
    WrapItem,
} from '@chakra-ui/react';
import { Movie } from 'typings';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';
import { Search2Icon, StarIcon } from '@chakra-ui/icons';
import { getVideos } from '_tmdb/movies/queries';
import { getTrailer } from '@/utils/getTrailer';

import { ImageBox } from '@/components/common/ImageBox';
import { Badge } from '@/components/common/Badge';
import { VideoBox } from '@/components/common/VideoBox';

import { useShowsContext } from 'contexts/ShowsContext';

interface ITrendingProps {
    movie: Movie;
}

const Trending: FC<ITrendingProps> = ({ movie }) => {
    const [movieTrailer, setMovieTrailer] = useState('');

    const { movieGenres, isVideo } = useShowsContext();

    const size = IMAGE_CONFIG.backdrop_sizes.find(s => s === 'original');

    const image = `${IMAGE_URL}${size}${movie.backdrop_path}`;

    const release_date = new Date(movie.release_date).toDateString();

    const handleGetVideo = async (id: number) => {
        const data = await getVideos(id);
        const trailer = getTrailer(data.results);
        setMovieTrailer(trailer);
    };

    const getShowGenres = useMemo(() => {
        if (movieGenres?.length > 0) {
            return movie.genre_ids.map(genre => {
                const showGenre = movieGenres?.find(g => g.id === genre);
                return showGenre?.name;
            });
        }

        return [];
    }, [movieGenres]);

    useEffect(() => {
        handleGetVideo(movie.id);
    }, []);

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="100px 15px 80px"
        >
            <Flex>
                <Heading
                    as="h2"
                    color={COLORS.white}
                    fontFamily="Nunito"
                    fontSize="30px"
                    mb={4}
                >
                    Treding Now
                </Heading>
            </Flex>

            <Flex
                alignItems="center"
                direction={['column', null, 'row']}
                justifyContent="center"
            >
                {!isVideo ? (
                    <ImageBox image={image} />
                ) : (
                    <VideoBox video={movieTrailer} />
                )}

                <Flex direction="column" ml={{ lg: '40px' }}>
                    <Heading as="h2" color={COLORS.white} fontFamily="Nunito">
                        {movie.original_title}
                    </Heading>
                    <Text color={COLORS.white}>
                        <chakra.span fontWeight="bold">
                            Release Date:
                        </chakra.span>{' '}
                        {release_date}
                    </Text>
                    <Flex alignItems="center" my="10px">
                        <StarIcon color="yellow.400" mr="5px" />
                        <Text
                            color={COLORS.white}
                            fontFamily="Nunito"
                            fontSize="12px"
                        >
                            <chakra.span fontSize="16px" fontWeight="800">
                                {movie.vote_average}
                            </chakra.span>
                            /10
                        </Text>
                    </Flex>
                    <Divider my={4} />
                    <Wrap mb="15px" spacingX="5px">
                        {getShowGenres?.length > 0 &&
                            getShowGenres?.map(
                                (genre: string, index: number) => {
                                    return (
                                        <WrapItem key={index}>
                                            <Badge genre={genre?.toLowerCase()}>
                                                #{genre}
                                            </Badge>
                                        </WrapItem>
                                    );
                                },
                            )}
                    </Wrap>
                    <Text color={COLORS.white}>{movie.overview}</Text>

                    <Flex mt={5}>
                        <Button
                            _hover={{
                                bg: COLORS.secondary,
                            }}
                            as="a"
                            bg={COLORS.primary}
                            borderRadius="0"
                            color={COLORS.white}
                            cursor="pointer"
                            leftIcon={<Search2Icon />}
                            mr={4}
                            transition="all 0.5s ease-in-out"
                        >
                            Read More...
                        </Button>
                        <Button
                            _hover={{
                                bg: COLORS.primary,
                            }}
                            as="a"
                            bg={COLORS.orange}
                            borderRadius="0"
                            color={COLORS.white}
                            cursor="pointer"
                            leftIcon={<StarIcon />}
                            transition="all 0.5s ease-in-out"
                        >
                            Leave a Review
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    );
};

export { Trending };

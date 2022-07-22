import { FC, useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';

import {
    chakra,
    Container,
    Divider,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';
import { Movie } from 'typings';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';
import { StarIcon } from '@chakra-ui/icons';
import { getMovieReviews, getVideos } from '_tmdb/movies/queries';
import { getTrailer } from '@/utils/getTrailer';
import { useRecoilValue } from 'recoil';
import { isVideoState, movieGenresState } from 'recoil/atoms';
import { ImageBox } from '@/components/common/ImageBox';
import { Badge } from '@/components/common/Badge';
import { VideoBox } from '@/components/common/VideoBox';

interface ITrendingProps {
    movie: Movie;
}

const Trending: FC<ITrendingProps> = ({ movie }) => {
    const [movieTrailer, setMovieTrailer] = useState('');
    const [reviews, setReviews] = useState([]);
    const movieGenres = useRecoilValue(movieGenresState);
    const isVideo = useRecoilValue(isVideoState);

    const size = IMAGE_CONFIG.backdrop_sizes.find(s => s === 'original');

    const image = `${IMAGE_URL}${size}${movie.backdrop_path}`;

    const release_date = new Date(movie.release_date).toDateString();

    const badgeStyle = {
        mr: '5px',
    };

    const handleGetVideo = async (id: number) => {
        const data = await getVideos(id);
        const trailer = getTrailer(data.results);
        setMovieTrailer(trailer);
    };

    const handleGetReviews = async (id: number) => {
        const userReviews = await getMovieReviews(id);
        setReviews(userReviews.results);
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
        handleGetReviews(movie.id);
    }, []);

    return (
        <Container
            h="full"
            maxW={{ base: '300vw', lg: '80vw' }}
            padding="100px 0"
        >
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

                <Flex direction="column" ml="40px">
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
                    <Flex mb="15px">
                        {getShowGenres?.length > 0 &&
                            getShowGenres?.map(
                                (genre: string, index: number) => {
                                    return (
                                        <Badge
                                            genre={genre?.toLowerCase()}
                                            key={index}
                                            {...badgeStyle}
                                        >
                                            #{genre}
                                        </Badge>
                                    );
                                },
                            )}
                    </Flex>
                    <Text color={COLORS.white}>{movie.overview}</Text>
                </Flex>
            </Flex>
        </Container>
    );
};

export { Trending };

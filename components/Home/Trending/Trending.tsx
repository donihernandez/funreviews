import { FC, useMemo } from 'react';
import { useEffect, useState } from 'react';

import {
    chakra,
    Container,
    Divider,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Movie } from 'typings';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { COLORS } from '@/styles/theme';
import { Search2Icon, StarIcon } from '@chakra-ui/icons';
import { getTrending, getVideos } from '_tmdb/movies/queries';
import { getTrailer } from '@/utils/getTrailer';

import { ImageBox } from '@/components/common/ImageBox';

import { VideoBox } from '@/components/common/VideoBox';

import { useShowsContext } from 'contexts/ShowsContext';

import { GenresList } from '@/components/common/GenreList';
import { PrimaryButton, ReviewButton } from '@/components/common/Buttons';
import { TRENDING_LIMIT } from '@/utils/constants';
import { Loading } from '@/components/common/Loading';

const Trending = () => {
    const [movieTrailer, setMovieTrailer] = useState('');
    const [image, setImage] = useState('');
    const [lazyImage, setLazyImage] = useState('');
    const [movie, setMovie] = useState(null);
    const [releaseDate, setReleaseDate] = useState('');
    const [isVideo, setIsVideo] = useState(false);
    const { movieGenres } = useShowsContext();

    const { data: trendingMovie, isSuccess } = useQuery(
        ['trendingMovie', TRENDING_LIMIT],
        () => getTrending(TRENDING_LIMIT),
    );

    const size = IMAGE_CONFIG.backdrop_sizes.find(s => s === 'original');
    const lazySize = IMAGE_CONFIG.backdrop_sizes.find(s => s === 'w780');

    const handleGetVideo = async (id: number) => {
        const data = await getVideos(id);
        const trailer = getTrailer(data.results);
        setMovieTrailer(trailer);
    };

    const getShowGenres = useMemo(() => {
        if (movieGenres?.length > 0) {
            return movie?.genre_ids.map(genre => {
                const showGenre = movieGenres?.find(g => g.id === genre);
                return showGenre?.name;
            });
        }
        return [];
    }, [movieGenres]);

    useEffect(() => {
        if (isSuccess) {
            setMovie(trendingMovie.results);
            setImage(
                `${IMAGE_URL}${size}${trendingMovie.results.backdrop_path}`,
            );
            setLazyImage(
                `${IMAGE_URL}${lazySize}${trendingMovie.results.backdrop_path}`,
            );
            setReleaseDate(
                new Date(trendingMovie.results.release_date).toDateString(),
            );
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isVideo) {
            handleGetVideo(movie?.id);
        }
    }, [isVideo]);

    return isSuccess ? (
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
                    fontSize="50px"
                    mb="20px"
                >
                    Treding Now
                </Heading>
            </Flex>

            <Flex
                alignItems={['center', null, 'flex-start']}
                direction="column"
                justifyContent={['center', null, 'flex-start']}
            >
                {!isVideo ? (
                    <ImageBox
                        alt={movie?.title}
                        image={image}
                        lazyImage={lazyImage}
                        setIsVideo={setIsVideo}
                    />
                ) : (
                    <VideoBox video={movieTrailer} />
                )}

                <Flex direction="column" mt="10px">
                    <Heading as="h2" color={COLORS.white} fontFamily="Nunito">
                        {movie?.original_title}
                    </Heading>
                    <Text color={COLORS.white}>
                        <chakra.span fontWeight="bold">
                            Release Date:
                        </chakra.span>{' '}
                        {releaseDate}
                    </Text>
                    <Flex alignItems="center" my="10px">
                        <StarIcon color="yellow.400" mr="5px" />
                        <Text
                            color={COLORS.white}
                            fontFamily="Nunito"
                            fontSize="12px"
                        >
                            <chakra.span fontSize="16px" fontWeight="800">
                                {movie?.vote_average}
                            </chakra.span>
                            /10
                        </Text>
                    </Flex>
                    <Divider my={4} />
                    <GenresList getGenres={getShowGenres} />
                    <Text color={COLORS.white} mt="10px">
                        {movie?.overview}
                    </Text>

                    <Flex mt={5}>
                        <PrimaryButton
                            icon={<Search2Icon />}
                            link={`/movies/${movie?.id}`}
                        />
                        <ReviewButton
                            icon={<StarIcon />}
                            showId={trendingMovie?.id}
                            showTitle={trendingMovie?.title}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    ) : (
        <Loading />
    );
};

export default Trending;

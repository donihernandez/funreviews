import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { COLORS } from '@/styles/theme';
import { Carousel } from '../Carousel';
import { MotionBox } from '../MotionBox';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Loading } from '../Loading';
import { ShowsFilters } from './ShowsFilters';
import { useQuery } from 'react-query';
import { getMovieGenres } from '@/api/movies/queries';
import { getTvGenres } from '@/api/tv/queries';
import { Movie, Tv } from 'typings';
import { useBreakpoints } from 'hooks';

interface IShowsContainer {
    title: string;
    titleStyles: any;
    filters: string[];
    items: Movie[] | Tv[];
    link: string;
    isLoading: boolean;
    type: 'movie' | 'tv';
}

const ShowsContainer: FC<IShowsContainer> = ({
    title,
    titleStyles,
    filters,
    items,
    link,
    isLoading,
    type,
}) => {
    const variants = {
        hide: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    const { isSmallerThanDesktop } = useBreakpoints();

    const [genres, setGenres] = useState({
        genres: [],
    });

    const [show, setShow] = useState(false);
    const [filtered, setFiltered] = useState(items);
    const [activeGenre, setActiveGenre] = useState('all');

    const { data: movieGenres } = useQuery('genres', getMovieGenres);
    const { data: tvGenres } = useQuery('tvGenres', getTvGenres);

    useEffect(() => {
        if (type === 'movie') {
            setGenres(movieGenres);
        } else {
            setGenres(tvGenres);
        }
    }, [movieGenres, tvGenres, type]);

    return (
        <Flex direction="column" h="full" padding="50px 0" w="full">
            <Flex
                alignItems="center"
                justifyContent="space-between"
                mb={4}
                w="full"
            >
                <Box width={isSmallerThanDesktop ? '200px' : 'full'}>
                    <Heading
                        as="h2"
                        fontFamily="Nunito"
                        fontSize="35px"
                        fontWeight="bold"
                        {...titleStyles}
                    >
                        {title}
                    </Heading>
                </Box>

                <Flex
                    fontSize="18px"
                    justifyContent="flex-end"
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                    w="full"
                >
                    <MotionBox>
                        <Link
                            _hover={{
                                color: COLORS.orange,
                                fontSize: '20px',
                                textDecoration: 'none',
                            }}
                            color={COLORS.white}
                            href={link}
                            mr="10px"
                            transition="all 0.5s ease-in-out"
                        >
                            View All
                        </Link>
                    </MotionBox>

                    <MotionBox
                        animate={show ? 'show' : 'hide'}
                        variants={variants}
                    >
                        <ArrowForwardIcon color={COLORS.white} />
                    </MotionBox>
                </Flex>
            </Flex>

            {!isSmallerThanDesktop && (
                <ShowsFilters
                    activeGenre={activeGenre}
                    filters={filters}
                    genres={genres}
                    items={items}
                    setActiveGenre={setActiveGenre}
                    setFiltered={setFiltered}
                />
            )}

            {isLoading ? (
                <Loading />
            ) : (
                <Carousel filtered={filtered} type={type} />
            )}
        </Flex>
    );
};

export { ShowsContainer };

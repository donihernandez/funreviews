import { Container, Flex, Heading, Link } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { COLORS } from '@/styles/theme';
import { Carousel } from '../Carousel';
import { InfoCard } from '../InfoCard';
import { MotionBox } from '../MotionBox';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Loading } from '../Loading';
import { Filters } from '../Filters';
import { useQuery } from 'react-query';
import { getMovieGenres } from '@/api/movies/queries';

interface IShowsContainer {
    title: string;
    titleStyles: any;
    filters: string[];
    items: any;
    link: string;
    isLoading: boolean;
}

const ShowsContainer: FC<IShowsContainer> = ({
    title,
    titleStyles,
    filters,
    items,
    link,
    isLoading,
}) => {
    const variants = {
        hide: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    const { data: genres } = useQuery('genres', getMovieGenres);

    const [show, setShow] = useState(false);
    const [filtered, setFiltered] = useState(items);
    const [activeGenre, setActiveGenre] = useState('all');

    return (
        <Container h="full" maxW={{ base: '300vw', lg: '80vw' }} minH="100vh">
            <Flex direction="column" h="full" padding="100px 0" w="full">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    w="full"
                >
                    <Heading
                        as="h2"
                        fontFamily="Nunito"
                        fontSize="35px"
                        fontWeight="bold"
                        {...titleStyles}
                    >
                        {title}
                    </Heading>

                    <Flex
                        fontSize="18px"
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
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

                <Filters
                    activeGenre={activeGenre}
                    filters={filters}
                    genres={genres}
                    items={items}
                    setActiveGenre={setActiveGenre}
                    setFiltered={setFiltered}
                />

                {isLoading ? <Loading /> : <Carousel filtered={filtered} />}
            </Flex>
        </Container>
    );
};

export { ShowsContainer };

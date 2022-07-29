import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { COLORS } from '@/styles/theme';
import { Carousel } from '../../Carousel';
import { MotionBox } from '../../MotionBox';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Loading } from '../../Loading';

import { Movie, Tv } from 'typings';
import { useBreakpoints } from 'hooks';

interface IShowsContainer {
    title: string;
    titleStyles?: any;
    items: Movie[] | Tv[];
    link?: string;
    isLoading?: boolean;
    type: 'movie' | 'tv';
}

const ShowsContainer: FC<IShowsContainer> = ({
    title,
    titleStyles,
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

    const [show, setShow] = useState(false);

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

            {isLoading ? <Loading /> : <Carousel shows={items} type={type} />}
        </Flex>
    );
};

export { ShowsContainer };

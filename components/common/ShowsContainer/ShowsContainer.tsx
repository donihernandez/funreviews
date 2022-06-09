import { Container, Flex, Heading, HStack, Link, Text } from '@chakra-ui/react';
import { FC, useState } from 'react';

import { COLORS } from '@/styles/theme';
import { Carousel } from '../Carousel';
import { InfoCard } from '../InfoCard';
import { MotionBox } from '../MotionBox';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface IShowsContainer {
    title: string;
    titleStyles: any;
    filters: string[];
    items: any;
    link: string;
}

const ShowsContainer: FC<IShowsContainer> = ({
    title,
    titleStyles,
    filters,
    items,
    link,
    ...props
}) => {
    const variants = {
        hide: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    const [show, setShow] = useState(false);

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

                <HStack margin="20px 0 40px 0" spacing={4}>
                    {filters.map((filter, index) => {
                        return (
                            <Text
                                color="yellow.400"
                                fontSize="18px"
                                fontWeight="bold"
                                key={index}
                                textTransform="uppercase"
                            >
                                #{filter}
                            </Text>
                        );
                    })}
                </HStack>

                <Carousel>
                    {items.map(item => {
                        return <InfoCard item={item} key={item.id} />;
                    })}
                </Carousel>
            </Flex>
        </Container>
    );
};

export { ShowsContainer };

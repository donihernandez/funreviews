import { FC, useMemo } from 'react';
import { Button, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { Badge } from '../../Badge';

import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';

import { useShowsContext } from 'contexts/ShowsContext';
import { Search2Icon, StarIcon } from '@chakra-ui/icons';

interface IShow {
    show: any;
}

const Show: FC<IShow> = ({ show }) => {
    const badgeStyle = {
        ml: '5px',
    };

    const { genres } = useShowsContext();

    const date = new Date(show.release_date || show.first_air_date);

    const size = IMAGE_CONFIG.poster_sizes.find(s => s === 'w342');

    const image = `${IMAGE_URL}${size}${show.poster_path}`;

    const getShowGenres = useMemo(() => {
        if (genres.length > 0) {
            return show.genre_ids.map(genre => {
                const showGenre = genres?.find(g => g.id === genre);
                return showGenre?.name;
            });
        }

        return [];
    }, [genres]);

    return (
        <Flex alignItems="center" mt="45px">
            <Image alt="Movie" h="260px" src={image} />
            <Flex
                color={COLORS.white}
                direction="column"
                ml={6}
                textAlign="justify"
            >
                <Heading as="h3" fontFamily="Lato" fontSize="xl">
                    {show.title || show.name} ({date.getFullYear()})
                </Heading>
                <Flex alignItems="center" py="15px">
                    <StarIcon boxSize="15px" color="yellow.500" />
                    <Text fontSize="md" ml={1}>
                        8.1/10
                    </Text>
                </Flex>
                <Text fontSize="14px" fontWeight="300">
                    {show.overview}
                </Text>

                <Divider my={4} />
                <Flex>
                    {getShowGenres?.length > 0 &&
                        getShowGenres?.map((genre: string, index: number) => {
                            return (
                                <Badge
                                    genre={genre?.toLowerCase()}
                                    key={index}
                                    {...badgeStyle}
                                >
                                    #{genre}
                                </Badge>
                            );
                        })}
                </Flex>
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
    );
};

export { Show };

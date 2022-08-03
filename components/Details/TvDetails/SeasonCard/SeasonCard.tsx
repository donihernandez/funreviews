/* eslint-disable max-len */
import type { FC } from 'react';

import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { Season } from 'typings';
import {
    AspectRatio,
    Box,
    chakra,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';
import { COLORS } from '@/styles/theme';
import Link from 'next/link';

interface ISeasonCardProps {
    season: Season;
    height?: string;
    width?: string;
    link: string;
}

const SeasonCard: FC<ISeasonCardProps> = ({
    height = '500px',
    width = '250px',
    season,
    link,
}) => {
    const size = IMAGE_CONFIG.poster_sizes.find(s => s === 'w342');

    const image = `${IMAGE_URL}${size}${season.poster_path}`;

    return (
        <Box
            color={COLORS.white}
            h={height}
            minW={width}
            mr="15px"
            position="relative"
            w="full"
        >
            <Flex
                direction="column"
                h="full"
                justifyContent="flex-end"
                w="full"
            >
                <AspectRatio h="full" minH="383px" ratio={1}>
                    <Image alt={season.name} src={image} />
                </AspectRatio>

                <Box p={2}>
                    <Heading
                        as="h6"
                        fontFamily="Lato"
                        fontSize="20px"
                        fontWeight="black"
                        pt="15px"
                        textTransform="uppercase"
                    >
                        {season.name}
                    </Heading>
                    <Text fontFamily="Lato">
                        <chakra.span fontWeight="bold">Episodes:</chakra.span>{' '}
                        {season.episode_count}
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

export { SeasonCard };

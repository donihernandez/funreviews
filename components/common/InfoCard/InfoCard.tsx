import type { FC } from 'react';
import {
    AspectRatio,
    Box,
    chakra,
    Flex,
    Heading,
    Image,
    Text,
} from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';

import { COLORS } from '../../../styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import { useShowsContext } from 'contexts/ShowsContext';

import { PrimaryButton, SecondaryButton } from '../Buttons';

interface IInfoCardProps {
    height?: string;
    width?: string;
    show: any;
    type: 'movie' | 'tv';
}

const InfoCard: FC<IInfoCardProps> = ({
    height = '500px',
    width = '261px',
    show,
    type,
}) => {
    const size = IMAGE_CONFIG.poster_sizes.find(s => s === 'w342');

    const image = `${IMAGE_URL}${size}${show.poster_path}`;

    const pathType = type === 'movie' ? 'movies' : 'tv-shows';

    const primaryButtonStyle = {
        mb: '10px',
    };

    return (
        <Box
            as={motion.div}
            cursor="pointer"
            h={height}
            minW={width}
            mr="15px"
            overflow="hidden"
            position="relative"
        >
            <Flex
                bg="rgba(0,0,0,0.5)"
                direction="column"
                h="full"
                justifyContent="flex-end"
                w="full"
            >
                <AspectRatio h="full" minH="383px" ratio={1}>
                    <Image
                        alt={show.original_title || show.original_name}
                        as={motion.img}
                        draggable={false}
                        src={image}
                    />
                </AspectRatio>

                <Heading
                    as="h6"
                    color={COLORS.white}
                    fontFamily="Lato"
                    fontSize="15px"
                    pt="15px"
                    textTransform="uppercase"
                >
                    {show.original_title || show.original_name}
                </Heading>
                <Flex alignItems="center" mt="5px">
                    <StarIcon color="yellow.400" mr="5px" />
                    <Text
                        color={COLORS.white}
                        fontFamily="Nunito"
                        fontSize="12px"
                    >
                        <chakra.span fontSize="16px" fontWeight="800">
                            {show.vote_average}
                        </chakra.span>
                        /10
                    </Text>
                </Flex>
                <Flex direction="column" mt={5}>
                    <PrimaryButton
                        icon={<FaPlay />}
                        link={`/${pathType}/${show.id}`}
                        text="Watch Now"
                        {...primaryButtonStyle}
                    />
                    <SecondaryButton icon={<StarIcon />} link="" />
                </Flex>
            </Flex>
        </Box>
    );
};

export { InfoCard };

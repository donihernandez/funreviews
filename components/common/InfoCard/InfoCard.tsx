import { FC } from 'react';
import {
    AspectRatio,
    Box,
    chakra,
    Flex,
    Heading,
    Text,
} from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';

import { COLORS } from '@/styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

import { PrimaryButton, ReviewButton } from '../Buttons';
import Image from 'next/image';

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
    const lazySize = IMAGE_CONFIG.poster_sizes.find(s => s === 'w92');

    const image = `${IMAGE_URL}${size}${show.poster_path}`;
    const lazyImage = `${IMAGE_URL}${lazySize}${show.poster_path}`;

    const pathType = type === 'movie' ? 'movies' : 'tv-shows';

    const primaryButtonStyle = {
        mb: '10px',
        w: 'full',
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
                <AspectRatio minH={342} ratio={1}>
                    <Image
                        alt={show.original_title || show.original_name}
                        blurDataURL={lazyImage}
                        draggable={false}
                        layout="fill"
                        loading="lazy"
                        objectFit="cover"
                        placeholder="blur"
                        quality={75}
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
                    <ReviewButton
                        icon={<StarIcon />}
                        showId={show.id}
                        showTitle={show.title}
                    />
                </Flex>
            </Flex>
        </Box>
    );
};

export { InfoCard };

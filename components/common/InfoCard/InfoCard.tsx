import type { FC } from 'react';
import { Box, chakra, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { StarIcon } from '@chakra-ui/icons';

import { COLORS } from '../../../styles/theme';
import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';
import { motion } from 'framer-motion';

interface IInfoCardProps {
    height?: string;
    width?: string;
    item: any;
    type: 'movie' | 'tv';
}

const InfoCard: FC<IInfoCardProps> = ({
    height = '437px',
    width = '261px',
    item,
}) => {
    const size = IMAGE_CONFIG.poster_sizes.find(s => s === 'w342');

    const image = `${IMAGE_URL}${size}${item.poster_path}`;

    return (
        <Box
            as={motion.div}
            cursor="pointer"
            h={height}
            minW={width}
            mr="15px"
            overflow="hidden"
            position="relative"
            whileHover={{ scale: 1.1 }}
        >
            <Flex
                bg="rgba(0,0,0,0.5)"
                direction="column"
                h="full"
                justifyContent="flex-end"
                padding="20px"
                w="full"
            >
                <Image
                    alt={item.original_title || item.original_name}
                    as={motion.img}
                    draggable={false}
                    src={image}
                />

                <Heading
                    as="h6"
                    color={COLORS.white}
                    fontFamily="Lato"
                    fontSize="15px"
                    mt="10px"
                    textTransform="uppercase"
                >
                    {item.original_title || item.original_name}
                </Heading>
                <Flex alignItems="center" mt="5px">
                    <StarIcon color="yellow.400" mr="5px" />
                    <Text
                        color={COLORS.white}
                        fontFamily="Nunito"
                        fontSize="12px"
                    >
                        <chakra.span fontSize="16px" fontWeight="800">
                            {item.vote_average}
                        </chakra.span>
                        /10
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export { InfoCard };

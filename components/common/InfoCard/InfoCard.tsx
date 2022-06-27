import type { FC } from 'react';
import { useState } from 'react';
import { Box, Button, chakra, Flex, Heading, Text } from '@chakra-ui/react';

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
    type,
}) => {
    const [opacity, setOpacity] = useState(0);

    const size = IMAGE_CONFIG.poster_sizes.find(s => s === 'w342');

    const image = `${IMAGE_URL}${size}${item.poster_path}`;

    return (
        <Box
            as={motion.div}
            backgroundColor={'rgba(0,0,0,0.5)'}
            backgroundImage={image}
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            cursor="pointer"
            h={height}
            minW={width}
            mr="15px"
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            overflow="hidden"
            position="relative"
            whileHover={{ scale: 1.1 }}
        >
            <Button
                _hover={{
                    bg: COLORS.primary,
                }}
                as="a"
                bg={COLORS.orange}
                borderRadius="0"
                color={COLORS.white}
                cursor="pointer"
                href={`/${type}/${item.id}`}
                left="30%"
                opacity={opacity}
                position="absolute"
                top="50%"
            >
                Read More
            </Button>

            <Flex
                bg="rgba(0,0,0,0.5)"
                direction="column"
                h="full"
                justifyContent="flex-end"
                padding="20px"
                w="full"
            >
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

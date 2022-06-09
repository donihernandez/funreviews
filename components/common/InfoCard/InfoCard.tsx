import type { FC } from 'react';
import { useState } from 'react';
import {
    Box,
    Button,
    chakra,
    Flex,
    Heading,
    HStack,
    Text,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { Badge } from '../../../components/common/Badge';
import { COLORS } from '../../../styles/theme';
import { MotionBox } from '../MotionBox';

interface IInfoCardProps {
    height?: string;
    item?: any;
}

const InfoCard: FC<IInfoCardProps> = ({ height = '437px', item }) => {
    const [opacity, setOpacity] = useState(0);

    return (
        <MotionBox marginRight="15px">
            <Box
                backgroundColor={'rgba(0,0,0,0.5)'}
                backgroundImage="url('/movies.webp')"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="cover"
                h={height}
                minW="250px"
                onMouseEnter={() => setOpacity(1)}
                onMouseLeave={() => setOpacity(0)}
                overflow="hidden"
                pointerEvents="none"
                position="relative"
                w="full"
            >
                <Button
                    _hover={{
                        bg: COLORS.secondary,
                    }}
                    bg={COLORS.orange}
                    borderRadius="0"
                    color={COLORS.white}
                    cursor="pointer"
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
                    overflow="hidden"
                    padding="20px"
                    w="full"
                >
                    <HStack>
                        <Badge genre="suspense">Suspense</Badge>
                        <Badge genre="terror">Terror</Badge>
                    </HStack>
                    <Heading
                        as="h6"
                        color={COLORS.white}
                        fontFamily="Lato"
                        fontSize="15px"
                        mt="10px"
                        textTransform="uppercase"
                    >
                        Stranger Things 3
                    </Heading>
                    <Flex alignItems="center" mt="5px">
                        <StarIcon color="yellow.400" mr="5px" />
                        <Text
                            color={COLORS.white}
                            fontFamily="Nunito"
                            fontSize="12px"
                        >
                            <chakra.span fontSize="16px" fontWeight="800">
                                7.4
                            </chakra.span>
                            /10
                        </Text>
                    </Flex>
                </Flex>
            </Box>
        </MotionBox>
    );
};

export { InfoCard };

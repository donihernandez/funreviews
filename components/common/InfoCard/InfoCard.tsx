import type { FC } from 'react';
import { Box, Flex, Heading, HStack, Text, chakra } from '@chakra-ui/react';
import { COLORS } from '../../../styles/theme';
import { StarIcon } from '@chakra-ui/icons';
import { Badge } from '../Badge';

const InfoCard: FC = () => {
  return (
    <Box
      h="344px"
      w="224px"
      backgroundColor={`rgba(0,0,0,0.5)`}
      backgroundImage="url('/movies.webp')"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="15px"
      overflow="hidden"
    >
      <Flex
        borderRadius="10px"
        overflow="hidden"
        direction="column"
        justifyContent="flex-end"
        backdropFilter="auto"
        backdropBlur="2px"
        padding="20px"
        bg="rgba(0,0,0,0.5)"
        h="full"
        w="full"
      >
        <HStack>
          <Badge genre="suspense">Suspense</Badge>
          <Badge genre="terror">Terror</Badge>
        </HStack>
        <Heading
          as="h6"
          fontFamily="Lato"
          fontSize="15px"
          textTransform="uppercase"
          color={COLORS.white}
          mt="10px"
        >
          Stranger Things 3
        </Heading>
        <Flex alignItems="center" mt="5px">
          <StarIcon color="yellow.400" mr="5px" />
          <Text fontFamily="Nunito" fontSize="12px" color={COLORS.white}>
            <chakra.span fontSize="16px" fontWeight="800">
              7.4
            </chakra.span>
            /10
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export { InfoCard };

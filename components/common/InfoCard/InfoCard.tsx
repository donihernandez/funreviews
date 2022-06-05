import { FC, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  chakra,
  Button,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

import { Badge } from '../Badge';
import { COLORS } from '../../../styles/theme';

interface IInfoCardProps {
  height: string;
}

const InfoCard: FC<IInfoCardProps> = ({ height = '437px' }) => {
  const [opacity, setOpacity] = useState(0);

  return (
    <Box
      h={height}
      w="full"
      position="relative"
      backgroundColor={`rgba(0,0,0,0.5)`}
      backgroundImage="url('/movies.webp')"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundPosition="center"
      overflow="hidden"
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
    >
      <Button
        _hover={{
          bg: COLORS.secondary,
        }}
        borderRadius="0"
        position="absolute"
        top="50%"
        left="30%"
        opacity={opacity}
        bg={COLORS.orange}
        color={COLORS.white}
        cursor="pointer"
      >
        Read More
      </Button>

      <Flex
        overflow="hidden"
        direction="column"
        justifyContent="flex-end"
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

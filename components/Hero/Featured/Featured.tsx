import { Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { InfoCard } from '../../common/InfoCard';

const Featured = () => {
  return (
    <Flex direction="column" padding="100px 0" h="full" w="full">
      <SimpleGrid
        columns={[1, 2, 3, 4]}
        gap={6}
        alignItems="center"
        justifyContent="center"
      >
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </SimpleGrid>
      <Flex justifyContent="center" w="full">
        <Button
          mt="50px"
          variant="outline"
          borderRadius="0"
          w="300px"
          colorScheme="orange"
        >
          View All
        </Button>
      </Flex>
    </Flex>
  );
};

export { Featured };

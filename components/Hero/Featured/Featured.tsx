import { Button, Flex } from '@chakra-ui/react';
import { InfoCard } from '../../common/InfoCard';

const Featured = () => {
  return (
    <Flex direction="column" padding="100px 0" h="full" w="full">
      <Flex
        direction={['column', null, 'row']}
        justifyContent={['center', 'space-between']}
      >
        <InfoCard />
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </Flex>
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

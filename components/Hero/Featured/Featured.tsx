import { Flex } from '@chakra-ui/react';
import { InfoCard } from '../../common/InfoCard';

const Featured = () => {
  return (
    <Flex
      padding="100px 0 200px 0"
      alignItems="center"
      justifyContent="space-between"
    >
      <InfoCard />
      <InfoCard />
      <InfoCard />
      <InfoCard />
    </Flex>
  );
};

export { Featured };

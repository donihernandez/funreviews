import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { Hero } from '../components/Hero';

const Home: NextPage = () => {
  return (
    <Flex>
      <Hero />
    </Flex>
  );
};

export default Home;

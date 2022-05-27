import { Flex, Heading, chakra, Container } from '@chakra-ui/react';
import { FC } from 'react';
import { DesktopMenu } from './DesktopMenu';

const Header: FC = () => {
  return (
    <Flex
      bg="#2d3142"
      height={{ base: '70px', lg: '90px' }}
      position="sticky"
      alignItems="center"
    >
      <Container maxW={{ base: '100vw', lg: '80vw' }}>
        <Flex alignItems="center">
          <Heading
            color="#ffffff"
            fontFamily="Lato"
            fontSize="30px"
            fontWeight="800"
            mr="50px"
          >
            Stream<chakra.span color="#ef8354">Flix</chakra.span>
          </Heading>
          <DesktopMenu />
        </Flex>
      </Container>
    </Flex>
  );
};

export { Header };

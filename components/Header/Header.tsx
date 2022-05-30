import type { FC } from 'react';
import { Flex, Heading, chakra, Container } from '@chakra-ui/react';

import { useBreakpoints } from '../../hooks';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

const Header: FC = () => {
  const { isSmallerThanDesktop } = useBreakpoints();

  return (
    <Flex
      bg="#2d3142"
      height={{ base: '70px', lg: '90px' }}
      position="sticky"
      alignItems="center"
    >
      <Container maxW={{ base: '100vw', lg: '80vw' }}>
        <Flex
          alignItems="center"
          justifyContent={['space-between', null, 'flex-start']}
        >
          <Heading
            color="#ffffff"
            fontFamily="Lato"
            fontSize="30px"
            fontWeight="800"
            mr="50px"
          >
            Stream<chakra.span color="#ef8354">Flix</chakra.span>
          </Heading>
          {isSmallerThanDesktop ? <MobileMenu /> : <DesktopMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export { Header };

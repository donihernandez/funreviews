import type { FC } from 'react';
import { Flex, Heading, chakra, Container } from '@chakra-ui/react';

import { useBreakpoints } from '../../hooks';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

import { COLORS } from '../../styles/theme';

const Header: FC = () => {
  const { isSmallerThanDesktop } = useBreakpoints();

  return (
    <Flex
      bg={COLORS.primary}
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
            color={COLORS.white}
            fontFamily="Lato"
            fontSize="30px"
            fontWeight="800"
            mr="50px"
          >
            Stream<chakra.span color={COLORS.orange}>Flix</chakra.span>
          </Heading>
          {isSmallerThanDesktop ? <MobileMenu /> : <DesktopMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export { Header };

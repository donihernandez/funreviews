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
      // bg={COLORS.primary}
      bg="transparent"
      top={0}
      left={0}
      height={{ base: '70px', lg: '90px' }}
      position="fixed"
      alignItems="center"
      w="full"
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
            Fun<chakra.span color={COLORS.orange}>Reviews</chakra.span>
          </Heading>
          {isSmallerThanDesktop ? <MobileMenu /> : <DesktopMenu />}
        </Flex>
      </Container>
    </Flex>
  );
};

export { Header };

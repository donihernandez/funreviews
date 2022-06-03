import { FC, useEffect, useState } from 'react';
import { Flex, Heading, chakra, Container } from '@chakra-ui/react';

import { useBreakpoints } from '../../hooks';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

import { COLORS } from '../../styles/theme';

const Header: FC = () => {
  const { isSmallerThanDesktop } = useBreakpoints();
  const [offset, setOffSet] = useState<number>(0);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onScroll = () => {
    setOffSet(window.scrollY);
  };

  return (
    <Flex
      bg={offset > 0 ? COLORS.primary : 'transparent'}
      top={0}
      left={0}
      height={{ base: '70px', lg: '90px' }}
      position="fixed"
      alignItems="center"
      transition="all .3s ease-in"
      w="full"
      zIndex="666"
    >
      <Container maxW={{ base: '100vw', lg: '80vw' }} w="full">
        <Flex
          alignItems="center"
          w="full"
          justifyContent={[
            'space-between',
            'space-between',
            'space-between',
            'flex-start',
          ]}
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

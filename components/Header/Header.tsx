import { FC, useEffect, useState } from 'react';
import { chakra, Container, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useBreakpoints } from '../../hooks';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';

import { COLORS } from '@/styles/theme';

const Header: FC = () => {
    const router = useRouter();
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
            alignItems="center"
            bg={offset > 0 ? COLORS.primary : 'transparent'}
            height={{ base: '70px', lg: '90px' }}
            left={0}
            position="fixed"
            top={0}
            transition="all .3s ease-in"
            w="full"
            zIndex="666"
        >
            <Container maxW={{ base: '100vw', lg: '80vw' }} w="full">
                <Flex
                    alignItems="center"
                    justifyContent={[
                        'space-between',
                        'space-between',
                        'space-between',
                        'flex-start',
                    ]}
                    w="full"
                >
                    <Heading
                        color={COLORS.white}
                        cursor="pointer"
                        fontFamily="Lato"
                        fontSize="30px"
                        fontWeight="800"
                        mr="50px"
                        onClick={() => router.push('/')}
                    >
                        Fun
                        <chakra.span color={COLORS.orange}>Reviews</chakra.span>
                    </Heading>
                    {isSmallerThanDesktop ? <MobileMenu /> : <DesktopMenu />}
                </Flex>
            </Container>
        </Flex>
    );
};

export default Header;

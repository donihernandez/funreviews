import type { FC } from 'react';
import { Button, Link as ChakraLink, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import links from '../links';

import { useShowsContext } from 'contexts/ShowsContext';
import { COLORS } from '@/styles/theme';

const DesktopMenu: FC = () => {
    const linkStyles = {
        _hover: {
            color: '#ef8354',
            textDecoration: 'none',
        },
        color: '#ffffff',
        fontFamily: 'Nunito',
        fontSize: '18px',
        fontWeight: '600',
        mr: '20px',
        textDecoration: 'none',
    };

    const router = useRouter();
    const { updateShows } = useShowsContext();

    return (
        <Flex alignItems="center" justifyContent="space-between" w="full">
            <Flex>
                {links.map(link => (
                    <Button
                        key={link.name}
                        onClick={() => {
                            updateShows([]);
                            router.push(link.href);
                        }}
                        variant="link"
                        {...linkStyles}
                    >
                        {link.name}
                    </Button>
                ))}
            </Flex>
            <Flex alignItems="center">
                <Link href="/login" passHref>
                    <ChakraLink {...linkStyles}>Login</ChakraLink>
                </Link>
                <Link href="/register" passHref>
                    <Button
                        _hover={{
                            bg: 'transparent',
                            borderColor: COLORS.orange,
                            color: COLORS.orange,
                            textDecoration: 'none',
                        }}
                        as={ChakraLink}
                        border="3px solid"
                        borderColor={COLORS.white}
                        borderRadius="0"
                        color={COLORS.white}
                        fontSize={['14px', '18px']}
                        transition="all 0.3s ease-in-out"
                        variant="outline"
                        w="full"
                    >
                        Register
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
};

export { DesktopMenu };

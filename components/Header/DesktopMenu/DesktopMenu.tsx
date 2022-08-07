import type { FC } from 'react';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';

import links from '../links';

import { useShowsContext } from 'contexts/ShowsContext';
import { useRouter } from 'next/router';
import { COLORS } from '@/styles/theme';
import Link from 'next/link';
import { useAuthContext } from 'contexts/AuthContext';

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
    const { user, logout } = useAuthContext();

    const handleLogout = () => {
        logout();
        router.push('/signin');
    };

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
            <Flex>
                {!user ? (
                    <>
                        <Link href="/signin" passHref>
                            <Button variant="link" {...linkStyles}>
                                Sign In
                            </Button>
                        </Link>

                        <Link href="/signup" passHref>
                            <Button
                                _hover={{
                                    borderColor: COLORS.orange,
                                    color: COLORS.orange,
                                }}
                                bg="transparent"
                                border="1px solid #ffffff"
                                borderRadius="0"
                                color={COLORS.white}
                                transition="all 0.4s ease-in-out"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </>
                ) : (
                    <Button
                        onClick={() => handleLogout()}
                        variant="link"
                        {...linkStyles}
                    >
                        Logout
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};

export { DesktopMenu };

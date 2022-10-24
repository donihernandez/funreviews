import { FC, useEffect, useState } from 'react';
import { useRef } from 'react';
import Link from 'next/link';
import {
    Button,
    Link as ChakraLink,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import links from '../links';
import { COLORS } from '../../../styles/theme';

import { HamburguerButton } from './HamburgerButton';
import { useShowsContext } from 'contexts/ShowsContext';
import { useAuthContext } from 'contexts/AuthContext';

const MobileMenu: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [username, setUsername] = useState('');

    const linkStyles = {
        _hover: {
            color: COLORS.orange,
            textDecoration: 'none',
        },
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '25px',
        fontWeight: '600',
        marginBottom: '10px',
        textDecoration: 'none',
    };

    const router = useRouter();
    const { updateShows } = useShowsContext();
    const { user, getCurrentUser, logout } = useAuthContext();

    const showUsername = async () => {
        const usernameData = await getCurrentUser();
        setUsername(usernameData.username);
    };

    useEffect(() => {
        if (user) {
            showUsername();
        }
    }, [user]);

    const navigate = (href: string) => {
        updateShows([]);
        router.push(href);
    };

    return (
        <>
            <HamburguerButton onClick={onOpen} ref={btnRef} />
            <Drawer
                finalFocusRef={btnRef}
                isOpen={isOpen}
                onClose={onClose}
                placement="right"
            >
                <DrawerOverlay />
                <DrawerContent bg={COLORS.primary} zIndex="9999">
                    <DrawerCloseButton
                        color={COLORS.white}
                        padding="20px"
                        size="30px"
                    />
                    <DrawerHeader
                        color={COLORS.white}
                        fontFamily="Lato"
                        fontSize="20px"
                    >
                        {username}
                    </DrawerHeader>
                    <DrawerBody>
                        <Flex
                            direction="column"
                            h="full"
                            justifyContent="space-between"
                        >
                            <Flex
                                alignItems="center"
                                direction="column"
                                h="full"
                                justifyContent="center"
                            >
                                {links.map(link => (
                                    <Button
                                        key={link.name}
                                        onClick={() => navigate(link.href)}
                                        textTransform="uppercase"
                                        variant="link"
                                        {...linkStyles}
                                    >
                                        {link.name}
                                    </Button>
                                ))}
                                {!user ? (
                                    <>
                                        <Link href="/login" passHref>
                                            <Button
                                                as={ChakraLink}
                                                mb="20px"
                                                textTransform="uppercase"
                                                variant="link"
                                                {...linkStyles}
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/login" passHref>
                                            <Button
                                                as={ChakraLink}
                                                mb="20px"
                                                textTransform="uppercase"
                                                variant="link"
                                                {...linkStyles}
                                            >
                                                Register
                                            </Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/profile" passHref>
                                            <Button
                                                as={ChakraLink}
                                                mb="20px"
                                                textTransform="uppercase"
                                                variant="link"
                                                {...linkStyles}
                                            >
                                                Profile
                                            </Button>
                                        </Link>

                                        <Button
                                            mb="20px"
                                            onClick={() => logout()}
                                            textTransform="uppercase"
                                            variant="link"
                                            {...linkStyles}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                )}
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { MobileMenu };

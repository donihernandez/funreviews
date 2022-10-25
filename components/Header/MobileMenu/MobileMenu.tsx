import { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import Link from 'next/link';
import {
    Avatar,
    Button,
    Link as ChakraLink,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import links from '../links';
import { COLORS } from '../../../styles/theme';

import { HamburguerButton } from './HamburgerButton';
import { useShowsContext } from 'contexts/ShowsContext';
import { useAuthContext } from 'contexts/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';

const MobileMenu: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);
    const [currentUser, setCurrentUser] = useState(null);

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
    const { user, logout } = useAuthContext();

    const navigate = (href: string) => {
        updateShows([]);
        router.push(href);
    };

    useEffect(() => {
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            const unsubscribe = onSnapshot(userDocRef, doc => {
                setCurrentUser(doc.data());
            });

            return () => unsubscribe();
        }
    }, [user]);

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
                    <DrawerHeader>
                        <Flex alignItems="center" justifyContent="flex-start">
                            {currentUser && (
                                <>
                                    <Avatar
                                        h="50px"
                                        name={currentUser.username || ''}
                                        src={currentUser.avatar || ''}
                                        w="50px"
                                    />
                                    <Text color={COLORS.white} ml="15px">
                                        {currentUser?.username}
                                    </Text>
                                </>
                            )}
                        </Flex>
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

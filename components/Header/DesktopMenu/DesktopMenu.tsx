import { FC, useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Link as ChakraLink,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import links from '../links';

import { COLORS } from '@/styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';
import { useAuthContext } from 'contexts/AuthContext';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/utils/firebase';

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
    const [currentUser, setCurrentUser] = useState(null);

    const router = useRouter();
    const { updateShows } = useShowsContext();
    const { user, logout } = useAuthContext();

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
                {!user ? (
                    <>
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
                    </>
                ) : (
                    <Menu>
                        <MenuButton
                            _active={{
                                backgroundColor: 'transparent',
                                color: COLORS.orange,
                            }}
                            _hover={{
                                backgroundColor: 'transparent',
                                color: COLORS.orange,
                            }}
                            as={Button}
                            bg="transparent"
                            color={COLORS.white}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Flex alignItems="center" justifyContent="center">
                                {currentUser && (
                                    <>
                                        <Avatar
                                            h="50px"
                                            name={currentUser.username || ''}
                                            src={currentUser.avatar || ''}
                                            w="50px"
                                        />
                                        <Text ml="15px">
                                            {currentUser?.username}
                                        </Text>
                                    </>
                                )}
                            </Flex>
                        </MenuButton>
                        <MenuList
                            bg="transparent"
                            border="1px solid"
                            borderColor={COLORS.orange}
                            borderRadius="0"
                            padding="0"
                        >
                            <Link href="/profile" passHref>
                                <MenuItem
                                    _active={{
                                        backgroundColor: 'transparent',
                                    }}
                                    _focus={{
                                        backgroundColor: 'transparent',
                                    }}
                                    _hover={{
                                        backgroundColor: COLORS.white,
                                        color: COLORS.primary,
                                        textDecoration: 'none',
                                    }}
                                    as={ChakraLink}
                                    color={COLORS.white}
                                    fontWeight="bold"
                                    py="15px"
                                >
                                    Profile
                                </MenuItem>
                            </Link>

                            <MenuItem
                                _active={{
                                    backgroundColor: 'transparent',
                                }}
                                _focus={{
                                    backgroundColor: 'transparent',
                                }}
                                _hover={{
                                    backgroundColor: COLORS.white,
                                    color: COLORS.primary,
                                }}
                                color={COLORS.white}
                                fontWeight="bold"
                                onClick={logout}
                                py="15px"
                            >
                                Logout
                            </MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </Flex>
    );
};

export { DesktopMenu };

import { Button, DrawerHeader, Flex, useDisclosure } from '@chakra-ui/react';
import { useRef } from 'react';
import type { FC } from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
} from '@chakra-ui/react';

import links from '../links';
import { COLORS } from '../../../styles/theme';

import { HamburguerButton } from './HamburgerButton';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useShowsContext } from 'contexts/ShowsContext';

const MobileMenu: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLButtonElement>(null);

    const linkStyles = {
        _hover: {
            color: COLORS.orange,
            textDecoration: 'none',
        },
        color: COLORS.white,
        fontFamily: 'Nunito',
        fontSize: '25px',
        fontWeight: '600',
        textDecoration: 'none',
    };

    const router = useRouter();
    const { updateShows } = useShowsContext();

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
                    <DrawerHeader></DrawerHeader>
                    <DrawerBody>
                        <Flex
                            alignItems="center"
                            direction="column"
                            h="full"
                            justifyContent="space-evenly"
                        >
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export { MobileMenu };

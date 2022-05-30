import { DrawerHeader, Flex, Link, useDisclosure } from '@chakra-ui/react';
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

import { HamburguerButton } from './HamburgerButton';

const MobileMenu: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const linkStyles = {
    _hover: {
      textDecoration: 'none',
      color: '#ef8354',
    },
    fontFamily: 'Nunito',
    fontSize: '25px',
    fontWeight: '600',
    color: '#ffffff',
    textDecoration: 'none',
  };

  return (
    <>
      <HamburguerButton onClick={onOpen} ref={btnRef} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#2d3142">
          <DrawerCloseButton size="30px" padding="20px" color="#ffffff" />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="space-evenly"
              h="full"
            >
              {links.map((link) => (
                <Link key={link.name} href={link.href} {...linkStyles}>
                  {link.name}
                </Link>
              ))}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { MobileMenu };

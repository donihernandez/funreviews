import type { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import links from '../links';
import Link from 'next/link';

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

    return (
        <Flex>
            {links.map(link => (
                <Button key={link.name} variant="link" {...linkStyles}>
                    <Link href={link.href}>{link.name}</Link>
                </Button>
            ))}
        </Flex>
    );
};

export { DesktopMenu };

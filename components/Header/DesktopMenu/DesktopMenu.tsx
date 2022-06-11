import type { FC } from 'react';
import { Flex, Link } from '@chakra-ui/react';

import links from '../links';

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
                <Link href={link.href} key={link.name} {...linkStyles}>
                    {link.name}
                </Link>
            ))}
        </Flex>
    );
};

export { DesktopMenu };

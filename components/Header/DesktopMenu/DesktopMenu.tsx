import type { FC } from 'react';
import { Button, Flex } from '@chakra-ui/react';

import links from '../links';

import { useShowsContext } from 'contexts/ShowsContext';
import { useRouter } from 'next/router';

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
    );
};

export { DesktopMenu };

import type { FC } from 'react';
import { Flex, Link } from '@chakra-ui/react';

import links from '../links';

const DesktopMenu: FC = () => {
  const linkStyles = {
    _hover: {
      textDecoration: 'none',
      color: '#ef8354',
    },
    fontFamily: 'Nunito',
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    textDecoration: 'none',
    mr: '20px',
  };

  return (
    <Flex>
      {links.map((link) => (
        <Link key={link.name} href={link.href} {...linkStyles}>
          {link.name}
        </Link>
      ))}
    </Flex>
  );
};

export { DesktopMenu };

import { Flex, Link } from '@chakra-ui/react';

const DesktopMenu = () => {
  const links = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Movies',
      href: '/movies',
    },
    {
      name: 'TV Shows',
      href: '/tv-shows',
    },
  ];

  const linkStyles = {
    _hover: {
      textDecoration: 'none',
      color: '#ef8354',
    },
    fontFamily: 'Nunito',
    fontSize: '20px',
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

import type { FC } from 'react';
import { Badge as ChakraBadge } from '@chakra-ui/react';

interface IBadgeProps {
  children: React.ReactNode;
  genre: string;
}

const Badge: FC<IBadgeProps> = ({ genre, children, ...props }) => {
  const getColor = () => {
    switch (genre) {
      case 'suspense':
        return {
          color: 'white',
          bg: 'purple.500',
        };
      case 'terror':
        return {
          color: 'white',
          bg: 'orange.500',
        };
      case 'drama':
        return {
          color: 'white',
          bg: 'gray.500',
        };
      case 'comedy':
        return {
          color: 'white',
          bg: 'green.500',
        };
      case 'action':
        return {
          color: 'white',
          bg: 'blue.500',
        };
      case 'sci-fi':
        return {
          color: 'white',
          bg: 'teal.500',
        };
      case 'animation':
        return {
          color: 'white',
          bg: 'teal.500',
        };
      default:
        return {
          color: 'white',
          bg: 'black',
        };
    }
  };

  return (
    <ChakraBadge
      as="span"
      fontFamily="Nunito"
      fontSize="12px"
      color={getColor().color}
      bg={getColor().bg}
      {...props}
    >
      {children}
    </ChakraBadge>
  );
};

export { Badge };

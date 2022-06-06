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
                    bg: 'purple.500',
                    color: 'white',
                };
            case 'terror':
                return {
                    bg: 'orange.500',
                    color: 'white',
                };
            case 'drama':
                return {
                    bg: 'gray.500',
                    color: 'white',
                };
            case 'comedy':
                return {
                    bg: 'green.500',
                    color: 'white',
                };
            case 'action':
                return {
                    bg: 'blue.500',
                    color: 'white',
                };
            case 'sci-fi':
                return {
                    bg: 'teal.500',
                    color: 'white',
                };
            case 'animation':
                return {
                    bg: 'teal.500',
                    color: 'white',
                };
            default:
                return {
                    bg: 'black',
                    color: 'white',
                };
        }
    };

    return (
        <ChakraBadge
            as="span"
            bg={getColor().bg}
            color={getColor().color}
            fontFamily="Nunito"
            fontSize="12px"
            {...props}
        >
            {children}
        </ChakraBadge>
    );
};

export { Badge };

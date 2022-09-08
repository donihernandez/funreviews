import Link from 'next/link';
import type { FC, JSXElementConstructor, ReactElement } from 'react';

import { Button, Link as ChakraLink } from '@chakra-ui/react';

import { COLORS } from '../../../../styles/theme';

interface IPrimaryButtonProps {
    link: string;
    text?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

const PrimaryButton: FC<IPrimaryButtonProps> = ({
    link,
    text = 'View More...',
    icon,
    ...props
}) => {
    return (
        <Link href={link} passHref>
            <Button
                _hover={{
                    bg: COLORS.secondary,
                    textDecoration: 'none',
                }}
                as={ChakraLink}
                bg={COLORS.primary}
                borderRadius="0"
                color={COLORS.white}
                cursor="pointer"
                leftIcon={icon}
                mr={4}
                transition="all 0.5s ease-in-out"
                variant="ghost"
                w="full"
                {...props}
            >
                {text}
            </Button>
        </Link>
    );
};

export { PrimaryButton };

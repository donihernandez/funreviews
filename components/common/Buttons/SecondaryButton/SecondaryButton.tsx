import type { FC, JSXElementConstructor, ReactElement } from 'react';
import Link from 'next/link';
import { Button, Link as ChakraLink } from '@chakra-ui/react';

import { COLORS } from '../../../../styles/theme';

interface ISecondaryButtonProps {
    link: string;
    text?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

const SecondaryButton: FC<ISecondaryButtonProps> = ({
    link,
    text = ' Leave a Review',
    icon,
    ...props
}) => {
    return (
        <Link href={link} passHref>
            <Button
                _hover={{
                    bg: COLORS.primary,
                    textDecoration: 'none',
                }}
                as={ChakraLink}
                bg={COLORS.orange}
                borderRadius="0"
                color={COLORS.white}
                cursor="pointer"
                leftIcon={icon}
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

export { SecondaryButton };

import Link from 'next/link';
import type { FC, JSXElementConstructor, ReactElement } from 'react';

import { Button } from '@chakra-ui/react';

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
        <Button
            _hover={{
                bg: COLORS.secondary,
            }}
            bg={COLORS.primary}
            borderRadius="0"
            color={COLORS.white}
            cursor="pointer"
            leftIcon={icon}
            mr={4}
            transition="all 0.5s ease-in-out"
            variant="unstyled"
            w="full"
            {...props}
        >
            <Link href={link}>{text}</Link>
        </Button>
    );
};

export { PrimaryButton };

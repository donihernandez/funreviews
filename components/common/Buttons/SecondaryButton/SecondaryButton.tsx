import type { FC, JSXElementConstructor, ReactElement } from 'react';
import { Button } from '@chakra-ui/react';

import { COLORS } from '../../../../styles/theme';
import Link from 'next/link';

interface ISecondaryButtonProps {
    link: string;
    text?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

const SecondaryButton: FC<ISecondaryButtonProps> = ({
    link,
    text = ' Leave a Review',
    icon,
}) => {
    return (
        <Button
            _hover={{
                bg: COLORS.primary,
            }}
            bg={COLORS.orange}
            borderRadius="0"
            color={COLORS.white}
            cursor="pointer"
            leftIcon={icon}
            transition="all 0.5s ease-in-out"
            variant="unstyled"
        >
            <Link href={link}>{text}</Link>
        </Button>
    );
};

export { SecondaryButton };

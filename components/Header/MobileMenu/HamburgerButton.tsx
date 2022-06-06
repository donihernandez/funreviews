import { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

import { HiMenuAlt1 } from 'react-icons/hi';

import { COLORS } from '../../../styles/theme';

interface IHamburgerButtonProps {
    onClick: () => void;
}

const HamburguerButton = forwardRef<HTMLButtonElement, IHamburgerButtonProps>(
    ({ onClick }, ref) => {
        return (
            <Button onClick={onClick} ref={ref} variant="link">
                <HiMenuAlt1 color={COLORS.white} size="30px" />
            </Button>
        );
    },
);

HamburguerButton.displayName = 'HamburguerButton';

export { HamburguerButton };

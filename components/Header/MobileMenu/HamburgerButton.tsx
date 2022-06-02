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
      <Button ref={ref} variant="link" onClick={onClick}>
        <HiMenuAlt1 size="30px" color={COLORS.white} />
      </Button>
    );
  }
);

HamburguerButton.displayName = 'HamburguerButton';

export { HamburguerButton };

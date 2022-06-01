import { forwardRef } from 'react';
import { Button } from '@chakra-ui/react';

import { HiMenuAlt1 } from 'react-icons/hi';

interface IHamburgerButtonProps {
  onClick: () => void;
}

const HamburguerButton = forwardRef<HTMLButtonElement, IHamburgerButtonProps>(
  ({ onClick }, ref) => {
    return (
      <Button ref={ref} variant="link" onClick={onClick}>
        <HiMenuAlt1 size="30px" color="#ffffff" />
      </Button>
    );
  }
);

HamburguerButton.displayName = 'HamburguerButton';

export { HamburguerButton };

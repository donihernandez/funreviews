import type { FC, JSXElementConstructor, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { Button, Link as ChakraLink, useDisclosure } from '@chakra-ui/react';

import { COLORS } from '../../../../styles/theme';
import { useAuthContext } from 'contexts/AuthContext';
import { ReviewModal } from '../../ReviewModal';

interface IReviewButtonProps {
    showId: number;
    showTitle: string;
    text?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>>;
}

const ReviewButton: FC<IReviewButtonProps> = ({
    text = 'Leave a Review',
    icon,
    showId,
    showTitle,
    ...props
}) => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { user } = useAuthContext();
    const router = useRouter();

    const handleReview = () => {
        if (!user) {
            router.push('/login');
        } else {
            onOpen();
        }
    };

    return (
        <>
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
                onClick={() => handleReview()}
                transition="all 0.5s ease-in-out"
                variant="ghost"
                {...props}
            >
                {text}
            </Button>
            <ReviewModal
                isOpen={isOpen}
                onClose={onClose}
                showId={showId}
                showTitle={showTitle}
            />
        </>
    );
};

export { ReviewButton };

import { FC, useEffect, useState } from 'react';

import {
    Button,
    chakra,
    Flex,
    FormControl,
    FormHelperText,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Textarea,
} from '@chakra-ui/react';
import ReactStars from 'react-rating-stars-component';
import { COLORS } from '@/styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';

interface IReviewModalProps {
    isOpen: boolean;
    showId: number;
    showTitle: string;
    onClose: () => void;
}

const ReviewModal: FC<IReviewModalProps> = ({
    isOpen,
    onClose,
    showId,
    showTitle,
}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const { storeReview } = useShowsContext();

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    useEffect(() => {
        setRating(0);
        setReview('');
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();
        await storeReview(showId, showTitle, rating, review);
        setRating(0);
        setReview('');
        onClose();
    };

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent bg={COLORS.white} color={COLORS.primary}>
                <ModalHeader>Leave a Fun Review</ModalHeader>
                <ModalCloseButton />
                <chakra.form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Flex direction="column">
                            <Flex alignItems="center">
                                <Text
                                    fontFamily="Nunito"
                                    fontSize="20px"
                                    fontWeight="bold"
                                    mr={4}
                                >
                                    Score:
                                </Text>
                                <ReactStars
                                    activeColor="#ffd700"
                                    count={5}
                                    isHalf={true}
                                    onChange={handleRating}
                                    size={24}
                                    value={rating}
                                />
                            </Flex>

                            <FormControl isRequired mt={4}>
                                <Textarea
                                    onChange={e => setReview(e.target.value)}
                                    rows={10}
                                    value={review}
                                />
                                <FormHelperText>Make it fun!</FormHelperText>
                            </FormControl>
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            _hover={{
                                bg: COLORS.white,
                                border: '1px solid',
                                borderColor: COLORS.primary,
                                color: COLORS.primary,
                            }}
                            bg={COLORS.secondary}
                            borderRadius={0}
                            color={COLORS.white}
                            mr={3}
                            onClick={onClose}
                        >
                            Close
                        </Button>
                        <Button
                            _hover={{
                                bg: COLORS.primary,
                            }}
                            bg={COLORS.orange}
                            borderRadius={0}
                            color={COLORS.white}
                            type="submit"
                        >
                            Review
                        </Button>
                    </ModalFooter>
                </chakra.form>
            </ModalContent>
        </Modal>
    );
};

export { ReviewModal };

import { useMediaQuery } from '@chakra-ui/react';

const useBreakpoints = () => {
    const [isSmallerThanDesktop] = useMediaQuery(['(max-width: 768px)']);

    return {
        isSmallerThanDesktop,
    };
};

export { useBreakpoints };

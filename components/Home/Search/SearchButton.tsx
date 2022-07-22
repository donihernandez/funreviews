import type { FC } from 'react';
import { Button } from '@chakra-ui/react';

import { COLORS } from '@/styles/theme';
import { useRouter } from 'next/router';

const SearchButton: FC = () => {
    const router = useRouter();

    return (
        <Button
            _active={{
                bg: 'transparent',
                borderColor: COLORS.primary,
            }}
            _hover={{
                bg: 'transparent',
                borderColor: COLORS.orange,
                color: COLORS.orange,
            }}
            border="3px solid"
            borderColor={COLORS.white}
            borderRadius="0"
            color={COLORS.white}
            fontSize={['14px', '18px']}
            h="70px"
            mt={[null, '50px']}
            onClick={() => router.push('/search', undefined, { shallow: true })}
            transition="all 0.3s ease-in-out"
            variant="outline"
            w={['full', null, '200px']}
        >
            Search
        </Button>
    );
};

export { SearchButton };

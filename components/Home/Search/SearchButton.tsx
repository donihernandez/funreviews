import type { FC } from 'react';
import { Button } from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { useShowsContext } from 'contexts/ShowsContext';
import { COLORS } from '../../../styles/theme';

const SearchButton: FC = () => {
    const router = useRouter();

    const { type } = useShowsContext();
    const url = type === 'movie' ? '/movies' : '/tv-shows';

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
            onClick={() => router.push(url, undefined, { shallow: true })}
            transition="all 0.3s ease-in-out"
            variant="outline"
            w={['full', null, '200px']}
        >
            Search
        </Button>
    );
};

export { SearchButton };

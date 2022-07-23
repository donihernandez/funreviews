import type { FC } from 'react';
import { Select } from '@chakra-ui/react';

import { COLORS } from '../../../styles/theme';
import { useShowsContext } from 'contexts/ShowsContext';

const commonStyles = {
    bg: 'transparent',
    border: '3px solid',
    borderColor: COLORS.white,
    borderRadius: '0',
    color: COLORS.white,
    fontFamily: 'Nunito',
    fontSize: '18px',
};

const Filters: FC = () => {
    const { setType, type } = useShowsContext();

    return (
        <Select
            borderBottom={['1px solid', null, '3px solid']}
            borderRight={[null, null, '1px solid']}
            borderRightColor={COLORS.white}
            h="70px"
            maxW={['100%', null, '200px']}
            {...commonStyles}
            onChange={e => setType(e.target.value)}
            value={type}
        >
            <option value="movie">Movies</option>
            <option value="tv">TV Shows</option>
        </Select>
    );
};

export { Filters };

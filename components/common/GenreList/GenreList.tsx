import type { FC } from 'react';
import { Wrap, WrapItem } from '@chakra-ui/react';

import { Badge } from '../Badge';

interface IGenreListProps {
    getGenres: string[];
}
const GenresList: FC<IGenreListProps> = ({ getGenres }) => {
    return (
        <Wrap spacingX="5px">
            {getGenres?.length > 0 &&
                getGenres?.map((genre: string, index: number) => {
                    return (
                        <WrapItem key={index}>
                            <Badge genre={genre?.toLowerCase()}>#{genre}</Badge>
                        </WrapItem>
                    );
                })}
        </Wrap>
    );
};

export { GenresList };

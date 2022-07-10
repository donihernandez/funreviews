import type { FC } from 'react';

import { Movie, Tv } from 'typings';
import { Show } from './Show';
import { useShowsContext } from 'contexts/ShowsContext';

import { List, ShowsListContainer } from './ShowsList.components';

const ShowsList: FC = () => {
    const { shows } = useShowsContext();

    return (
        <ShowsListContainer>
            <List>
                {shows?.map((show: Movie | Tv) => {
                    return <Show key={show.id} show={show} />;
                })}
            </List>
        </ShowsListContainer>
    );
};

export { ShowsList };

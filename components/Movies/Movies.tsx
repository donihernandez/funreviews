import type { FC } from 'react';
import { Intro } from '../common/Intro';
import { Wrapper } from '../common/Wrapper';

const Movies: FC = () => {
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: 'Movies',
        },
    ];

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Movies" />
        </Wrapper>
    );
};

export { Movies };

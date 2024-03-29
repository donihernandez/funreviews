import { SimpleGrid } from '@chakra-ui/react';
import { useShowsContext } from 'contexts/ShowsContext';
import type { FC } from 'react';
import { InfoCard } from '../common/InfoCard';
import { Intro } from '../common/Intro';
import { Wrapper } from '../common/Wrapper';

const Search: FC = () => {
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: 'Search Page',
        },
    ];

    const { shows, type } = useShowsContext();

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Search" />
            <SimpleGrid columns={[1, null, 4]} my="150px" spacing={8}>
                {shows.map(show => (
                    <InfoCard key={show.id} show={show} type={type} />
                ))}
            </SimpleGrid>
        </Wrapper>
    );
};

export { Search };

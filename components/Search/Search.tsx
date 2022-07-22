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

    const { shows, type, searchTerm } = useShowsContext();

    console.log(type);
    console.log(searchTerm);

    return (
        <Wrapper>
            <Intro breadcrumbs={breadcrumbs} title="Search" />
            <SimpleGrid columns={[1, null, 4]} my="150px" spacing={8}>
                {shows.map(show => (
                    <InfoCard item={show} key={show.id} type={type} />
                ))}
            </SimpleGrid>
        </Wrapper>
    );
};

export { Search };

import { HStack, Text } from '@chakra-ui/react';
import { FC, useEffect } from 'react';

interface IFiltersProps {
    filters: string[];
    setFiltered: (items: []) => void;
    activeGenre: string;
    setActiveGenre: (genre: string) => void;
    items: any;
    genres: Genres;
}

interface Genres {
    genres: {
        id: number;
        name: string;
    }[];
}

const Filters: FC<IFiltersProps> = ({
    filters,
    items,
    genres,
    setFiltered,
    activeGenre,
    setActiveGenre,
}) => {
    const getGenreId = () => {
        const result = genres.genres.find(
            (genre: { id: number; name: string }) => {
                if (genre.name === activeGenre) {
                    return genre.id;
                }
            },
        );

        return result?.id;
    };

    useEffect(() => {
        if (activeGenre === 'all') {
            setFiltered(items);
            return;
        }

        const filtered = items.filter(item => {
            return item.genre_ids.includes(getGenreId());
        });

        setFiltered(filtered);
    }, [activeGenre]);

    return (
        <HStack margin="20px 0 40px 0" spacing={4}>
            <Text
                _hover={{
                    transform: 'scale(1.2)',
                }}
                color="yellow.400"
                cursor="pointer"
                fontSize="12px"
                fontWeight="bold"
                onClick={() => setActiveGenre('all')}
                textTransform="uppercase"
                transition="all 0.4s ease-in-out"
            >
                #All
            </Text>
            {filters.map((filter, index) => {
                return (
                    <Text
                        _hover={{
                            transform: 'scale(1.2)',
                        }}
                        color="yellow.400"
                        cursor="pointer"
                        fontSize="12px"
                        fontWeight="bold"
                        key={index}
                        onClick={() => setActiveGenre(filter)}
                        textTransform="uppercase"
                        transition="all 0.4s ease-in-out"
                    >
                        #{filter}
                    </Text>
                );
            })}
        </HStack>
    );
};

export { Filters };

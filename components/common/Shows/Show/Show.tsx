import { FC, useMemo } from 'react';
import { Divider, Flex } from '@chakra-ui/react';

import { IMAGE_CONFIG, IMAGE_URL } from '@/utils/images';

import { useShowsContext } from 'contexts/ShowsContext';
import { Search2Icon, StarIcon } from '@chakra-ui/icons';
import { useBreakpoints } from 'hooks';

import { GenresList } from '../../GenreList';
import {
    ShowContainer,
    ShowDescription,
    ShowDetailsContainer,
    ShowImage,
    ShowRating,
    ShowTitle,
} from './Show.components';
import { PrimaryButton, SecondaryButton } from '../../Buttons';

interface IShow {
    show: any;
}

const Show: FC<IShow> = ({ show }) => {
    const { genres, type } = useShowsContext();

    const { isSmallerThanDesktop } = useBreakpoints();

    const date = new Date(show.release_date || show.first_air_date);

    const path = isSmallerThanDesktop ? show.backdrop_path : show.poster_path;

    const size = isSmallerThanDesktop
        ? IMAGE_CONFIG.poster_sizes.find(s => s === 'w342')
        : IMAGE_CONFIG.backdrop_sizes.find(s => s === 'original');

    const image = `${IMAGE_URL}${size}${path}`;

    const pathMedia = type === 'movie' ? 'movies' : 'tv-shows';

    const getShowGenres = useMemo(() => {
        if (genres && genres?.length > 0) {
            return show?.genre_ids.map(genre => {
                const showGenre = genres?.find(g => g.id === genre);
                if (showGenre) {
                    return showGenre.name;
                }
            });
        }
        return [];
    }, [genres]);

    return (
        path && (
            <ShowContainer>
                <ShowImage image={image} name={show.name} title={show.title} />
                <ShowDetailsContainer>
                    <ShowTitle
                        date={date}
                        name={show.name}
                        title={show.title}
                    />
                    <ShowRating vote_average={show.vote_average} />
                    <ShowDescription overview={show.overview} />

                    <Divider my={4} />
                    <GenresList getGenres={getShowGenres} />
                    <Flex mt={5}>
                        <PrimaryButton
                            icon={<Search2Icon />}
                            link={`/${pathMedia}/${show.id}`}
                        />
                        <SecondaryButton icon={<StarIcon />} link="" />
                    </Flex>
                </ShowDetailsContainer>
            </ShowContainer>
        )
    );
};

export { Show };

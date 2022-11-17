import { GenresList } from '@/components/common/GenreList';
import { Button, chakra, Divider, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { getTvDetails } from '_tmdb/tv/queries';
import dynamic from 'next/dynamic';

import { Description } from '../Details.components';
import { COLORS } from '@/styles/theme';
import { useRouter } from 'next/router';

const Details = () => {
    /*Imports */
    const InfoContainer = dynamic(() =>
        import('../Details.components').then(module => module.InfoContainer),
    );
    const Description = dynamic(() =>
        import('../Details.components').then(module => module.Description),
    );
    const Title = dynamic(() =>
        import('../Details.components').then(module => module.Title),
    );
    const DetailsContainer = dynamic(() =>
        import('../Details.components').then(module => module.DetailsContainer),
    );
    const ProductionCompaniesContainer = dynamic(() =>
        import('../Details.components').then(
            module => module.ProductionCompaniesContainer,
        ),
    );
    const Rate = dynamic(() =>
        import('../Details.components').then(module => module.Rate),
    );

    const router = useRouter();
    const { id } = router.query;
    const [details, setDetails] = useState(null);
    const [date, setDate] = useState('');

    const { data: tvDetails, isSuccess } = useQuery(['tvDetails', id], () =>
        getTvDetails(id as string),
    );

    useEffect(() => {
        if (isSuccess) {
            setDate(new Date(tvDetails.release_date).toDateString());
            setDetails(tvDetails);
        }
    }, []);

    const getGenres = (): string[] => {
        return details?.genres.map(genre => genre.name);
    };

    return (
        <DetailsContainer>
            <InfoContainer>
                <Title title={details?.name} />
                <Rate vote_average={details?.vote_average} />
                <Description overview={details?.overview} />
                <Divider color={COLORS.white} my="15px" />
                <Text color={COLORS.white} fontWeight="extrabold">
                    First Air Date:{' '}
                    <chakra.span fontWeight="light">{date}</chakra.span>
                </Text>
                <Divider color={COLORS.white} my="15px" />
                <GenresList getGenres={getGenres()} />
                <Divider color={COLORS.white} my="15px" />
                <ProductionCompaniesContainer
                    companies={details?.production_companies}
                />
                <Button
                    _hover={{
                        bg: COLORS.primary,
                    }}
                    as="a"
                    bg={COLORS.orange}
                    borderRadius="0"
                    color={COLORS.white}
                    cursor="pointer"
                    href={details?.homepage}
                    leftIcon={<FaPlay />}
                    mt="15px"
                    target="_blank"
                    transition="all 0.5s ease-in-out"
                >
                    Watch Now
                </Button>
            </InfoContainer>
        </DetailsContainer>
    );
};

export default Details;

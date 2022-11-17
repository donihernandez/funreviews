import { GenresList } from '@/components/common/GenreList';
import { COLORS } from '@/styles/theme';
import { Button, Divider } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { getMovieDetails } from '_tmdb/movies/queries';

const Details = () => {
    /*Imports*/
    const InfoContainer = dynamic(() =>
        import('../Details.components').then(module => module.InfoContainer),
    );
    const MovieBudgetAndReleaseDate = dynamic(() =>
        import('./MovieDetails.components').then(
            module => module.MovieBudgetAndReleaseDate,
        ),
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

    const { data: movieDetails, isSuccess } = useQuery(
        ['movieDetails', id],
        () => getMovieDetails(id as string),
    );

    useEffect(() => {
        if (isSuccess) {
            setDate(new Date(movieDetails.release_date).toDateString());
            setDetails(movieDetails);
        }
    }, []);

    const getGenres = (): string[] => {
        return details?.genres.map(genre => genre.name);
    };

    return (
        <DetailsContainer>
            <InfoContainer>
                <Title title={details?.title} />
                <Rate vote_average={details?.vote_average} />
                <Description overview={details?.overview} />
                <Divider color={COLORS.white} my="15px" />

                <MovieBudgetAndReleaseDate
                    budget={details?.budget}
                    date={date}
                />

                <Divider color={COLORS.white} my="15px" />
                <GenresList getGenres={getGenres()} />
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

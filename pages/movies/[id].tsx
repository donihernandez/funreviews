import { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { MovieDetails } from '@/components/Details/MovieDetails';
import {
    getMovieCredits,
    getMovieDetails,
    getMovieGenres,
    getMovieReviews,
    getPopular,
    getRecommendations,
    getWatchProviders,
} from '_tmdb/movies/queries';

const MovieDetailsPage: NextPage = () => {
    return <MovieDetails />;
};

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['movieGenres'], getMovieGenres);
    await queryClient.prefetchQuery(['movieDetails', params.id], () =>
        getMovieDetails(params.id),
    );
    await queryClient.prefetchQuery(['movieCredits', params.id], () =>
        getMovieCredits(params.id),
    );
    await queryClient.prefetchQuery(['movieReviews', params.id], () =>
        getMovieReviews(params.id),
    );

    await queryClient.prefetchQuery(['movieRecommendations', params.id], () =>
        getRecommendations(params.id),
    );

    await queryClient.prefetchQuery(['movieProviders', params.id], () =>
        getWatchProviders(params.id),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export async function getStaticPaths() {
    const popularMovies = await getPopular();
    const paths = popularMovies.results.map(movie => ({
        params: { id: movie.id.toString() },
    }));

    return { fallback: 'blocking', paths };
}

export default MovieDetailsPage;

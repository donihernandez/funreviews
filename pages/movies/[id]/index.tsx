import { NextPage } from 'next';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { MovieDetails } from '@/components/Details/MovieDetails';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import {
    getMovieCredits,
    getMovieDetails,
    getMovieReviews,
    getPopular,
    getRecommendations,
    getVideos,
} from '_tmdb/movies/queries';
import { FullPageLoader } from '@/components/common/FullPageLoader';

const MovieDetailsPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: movieDetails } = useQuery(['movieDetails', id], () =>
        getMovieDetails(id as string),
    );

    const { data: movieCredits, isSuccess: movieCreditsSuccess } = useQuery(
        ['movieCredits', id],
        () => getMovieCredits(id as string),
    );
    const { data: movieReviews, isSuccess: movieReviewsSuccess } = useQuery(
        ['movieReviews', id],
        () => getMovieReviews(id as string),
    );

    const {
        data: movieRecommendations,
        isSuccess: movieRecommendationsSuccess,
    } = useQuery(['movieRecommendations', id], () =>
        getRecommendations(id as string),
    );

    return movieRecommendationsSuccess &&
        movieCreditsSuccess &&
        movieReviewsSuccess ? (
        <>
            <NextSeo
                canonical={`https://funreviews.org/movies/${id}`}
                description={movieDetails.overview}
                title={`${movieDetails.title} | FunReviews`}
            />
            <MovieDetails
                movieCredits={movieCredits}
                movieDetails={movieDetails}
                movieRecommendations={movieRecommendations}
                movieReviews={movieReviews}
            />
        </>
    ) : (
        <FullPageLoader />
    );
};

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['movieDetails', params.id], () =>
        getMovieDetails(params.id),
    );
    await queryClient.prefetchQuery(['movieCredits', params.id], () =>
        getMovieCredits(params.id),
    );
    await queryClient.prefetchQuery(['movieReviews', params.id], () =>
        getMovieReviews(params.id),
    );

    await queryClient.prefetchQuery(['movieVideos', params.id], () => {
        getVideos(params.id);
    });

    await queryClient.prefetchQuery(['movieRecommendations', params.id], () =>
        getRecommendations(params.id),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            revalidate: 30 * 60,
        },
    };
}

export async function getStaticPaths() {
    const movies = await getPopular();
    const paths = movies.results.map(movie => ({
        params: { id: movie.id.toString() },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
}

export default MovieDetailsPage;

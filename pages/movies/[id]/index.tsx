import { NextPage } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { MovieDetails } from '@/components/Details/MovieDetails';
import { useRouter } from 'next/router';

import {
    getAllMovies,
    getMovieCredits,
    getMovieDetails,
    getMovieReviews,
    getRecommendations,
    getVideos,
} from '_tmdb/movies/queries';
import { FullPageLoader } from '@/components/common/FullPageLoader';
import { useCallback, useEffect, useState } from 'react';
import { getTrailer } from '@/utils/getTrailer';
import { useShowsContext } from 'contexts/ShowsContext';

const MovieDetailsPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [funReviews, setFunReviews] = useState();
    const { getReviewsById } = useShowsContext();
    const [date, setDate] = useState('');

    const [movieTrailer, setMovieTrailer] = useState('');

    const { data: movieCredits, isSuccess: movieCreditsSuccess } = useQuery(
        ['movieCredits', id],
        () => getMovieCredits(id as string),
    );

    const { data: movieReviews, isSuccess: movieReviewsSuccess } = useQuery(
        ['movieReviews', id],
        () => getMovieReviews(id as string),
    );

    const { data: movieVideos, isSuccess: movieVideosSuccess } = useQuery(
        ['movieVideos', id],
        () => getVideos(id as string),
    );

    const {
        data: movieRecommendations,
        isSuccess: movieRecommendationsSuccess,
    } = useQuery(['movieRecommendations', id], () =>
        getRecommendations(id as string),
    );

    const { data: movieDetails, isSuccess: movieDetailsSuccess } = useQuery(
        ['movieDetails', id],
        () => getMovieDetails(id as string),
    );
    const breadcrumbs = [
        {
            link: '/',
            name: 'Home',
        },
        {
            link: '/movies',
            name: 'Movies',
        },
        {
            isCurrentPage: true,
            link: '#',
            name: movieDetails?.title,
        },
    ];

    const handleGetVideo = useCallback(async () => {
        const trailer = getTrailer(movieVideos?.results);
        setMovieTrailer(trailer);
    }, [movieVideos]);

    const getFunReviews = async () => {
        const reviews = await getReviewsById(id);
        setFunReviews(reviews);
    };

    useEffect(() => {
        getFunReviews();
    }, []);

    useEffect(() => {
        if (movieDetailsSuccess) {
            setDate(new Date(movieDetails.release_date).toDateString());
        }
    }, [movieDetailsSuccess]);

    useEffect(() => {
        handleGetVideo();
    }, [movieVideosSuccess]);

    return movieDetailsSuccess &&
        movieVideosSuccess &&
        movieRecommendationsSuccess &&
        movieCreditsSuccess &&
        movieReviewsSuccess &&
        funReviews ? (
        <MovieDetails
            breadcrumbs={breadcrumbs}
            date={date}
            funReviews={funReviews}
            movieCredits={movieCredits}
            movieDetails={movieDetails}
            movieRecommendations={movieRecommendations}
            movieReviews={movieReviews}
            movieVideos={movieVideos}
            trailer={movieTrailer}
        />
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
    const allMovies = await getAllMovies();
    const paths = allMovies.map(movie => ({
        params: { id: movie.id.toString() },
    }));

    return {
        fallback: 'blocking',
        paths,
    };
}

export default MovieDetailsPage;

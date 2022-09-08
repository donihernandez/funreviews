import type { NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';

import { TvDetails } from '@/components/Details/TvDetails';

import {
    getTvCredits,
    getTvDetails,
    getTvGenres,
    getTvPopular,
    getTvRecommendations,
    getTvReviews,
} from '_tmdb/tv/queries';

const TVShowsDetailsPage: NextPage = () => {
    return <TvDetails />;
};

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery(['tvGenres'], () => getTvGenres());

    queryClient.prefetchQuery(['tvDetails', params.id], () =>
        getTvDetails(params.id),
    );

    queryClient.prefetchQuery(['tvCredits', params.id], () =>
        getTvCredits(params.id),
    );

    queryClient.prefetchQuery(['tvRecommendations', params.id], () =>
        getTvRecommendations(params.id),
    );

    queryClient.prefetchQuery(['tvReviews', params.id], () =>
        getTvReviews(params.id),
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

export async function getStaticPaths() {
    const popularTvShows = await getTvPopular();
    const paths = popularTvShows.results.map(tvShow => ({
        params: { id: tvShow.id.toString() },
    }));

    return { fallback: 'blocking', paths };
}

export default TVShowsDetailsPage;

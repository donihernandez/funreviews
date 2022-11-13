/* eslint-disable max-len */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { TvDetails } from '@/components/Details/TvDetails';

import {
    getAllTv,
    getTvCredits,
    getTvDetails,
    getTvGenres,
    getTvRecommendations,
    getTvReviews,
    getTvVideos,
} from '_tmdb/tv/queries';
import { FullPageLoader } from '@/components/common/FullPageLoader';

const TVShowsDetailsPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { data: tvCredits, isSuccess: tvCreditsSuccess } = useQuery(
        ['tvCredits', id],
        () => getTvCredits(id as string),
    );

    const { data: tvReviews, isSuccess: tvReviewsSuccess } = useQuery(
        ['tvReviews', id],
        () => getTvReviews(id as string),
    );

    const { data: tvVideos, isSuccess: tvVideosSuccess } = useQuery(
        ['tvVideos', id],
        () => getTvVideos(id as string),
    );

    const { data: tvRecommendations, isSuccess: tvRecommendationsSuccess } =
        useQuery(['tvRecommendations', id], () =>
            getTvRecommendations(id as string),
        );

    const { data: tvDetails, isSuccess: tvDetailsSuccess } = useQuery(
        ['tvDetails', id],
        () => getTvDetails(id as string),
    );

    return tvDetailsSuccess &&
        tvRecommendationsSuccess &&
        tvVideosSuccess &&
        tvReviewsSuccess &&
        tvCreditsSuccess ? (
        <>
            <NextSeo
                canonical={`https://funreviews.org/tv/${id}`}
                description={tvDetails.overview}
                title={`${tvDetails.name} | FunReviews`}
            />

            <TvDetails
                tvCredits={tvCredits}
                tvDetails={tvDetails}
                tvRecommendations={tvRecommendations}
                tvReviews={tvReviews}
                tvVideos={tvVideos}
            />
        </>
    ) : (
        <FullPageLoader />
    );
};

export async function getStaticProps({ params }) {
    const queryClient = new QueryClient();

    queryClient.prefetchQuery(['tvGenres'], () => getTvGenres());

    queryClient.prefetchQuery(['tvVideos', params.id], () =>
        getTvVideos(params.id),
    );

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
    const allTv = await getAllTv();
    const paths = allTv.map(tvShow => ({
        params: { id: tvShow.id.toString() },
    }));

    return { fallback: 'blocking', paths };
}

export default TVShowsDetailsPage;

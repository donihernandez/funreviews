/* eslint-disable max-len */
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';

import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

import { getMovieGenres, getPopular } from '_tmdb/movies/queries';
import { FullPageLoader } from '@/components/common/FullPageLoader';
import { Movies } from '@/components/Movies';

import { useShowsContext } from 'contexts/ShowsContext';

const MoviesPage: NextPage = () => {
    const [loading, setLoading] = useState(false);
    const { setShows, setGenres, setTotalPages } = useShowsContext();

    const { data: movieGenres, isSuccess: movieGenresSuccess } = useQuery(
        ['movieGenres'],
        () => getMovieGenres(),
    );

    const { data: popularMovies, isSuccess: popularMoviesSuccess } = useQuery(
        ['popularMovies'],
        () => getPopular(),
    );

    useEffect(() => {
        setShows([]);
        setLoading(true);
        if (popularMoviesSuccess) {
            setShows(popularMovies.results);
            setTotalPages(popularMovies.total_pages);
        }
        if (movieGenresSuccess) {
            setGenres(movieGenres.genres);
        }
        setLoading(false);
    }, [movieGenresSuccess, popularMoviesSuccess]);

    return (
        <>
            <NextSeo
                additionalMetaTags={[
                    {
                        content: 'movie reviews',
                        name: 'keywords',
                    },
                ]}
                canonical="https://funreviews.org/movies"
                description="Watch popular Movies and create a fun review of it."
                title="Movies | FunReviews"
            />
            {!loading ? <Movies /> : <FullPageLoader />}
        </>
    );
};

export async function getStaticProps() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(['movieGenres'], () => getMovieGenres());
    await queryClient.prefetchQuery(['popularMovies'], () => getPopular());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            revalidate: 30 * 60,
        },
    };
}

export default MoviesPage;

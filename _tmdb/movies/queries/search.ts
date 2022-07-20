import { client } from '@/utils/client';

interface IQuery {
    'primary_release_date.gte': string;
    'primary_release_date.lte': string;
    sort_by: string;
    'vote_average.gte': number;
    'vote_average.lte': number;
    with_genres: string;
}

const searchMovies = async (query: IQuery) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        {
            params: query,
        },
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { searchMovies };

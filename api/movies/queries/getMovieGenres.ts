import { client } from '@/utils/client';

const getMovieGenres = async () => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getMovieGenres };

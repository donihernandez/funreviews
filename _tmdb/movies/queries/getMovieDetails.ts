import { client } from '@/utils/client';

const getMovieDetails = async (id: number) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getMovieDetails };

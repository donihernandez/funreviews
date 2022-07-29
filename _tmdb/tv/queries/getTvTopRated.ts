import { client } from '@/utils/client';

const getTvTopRated = async (page = 1) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getTvTopRated };

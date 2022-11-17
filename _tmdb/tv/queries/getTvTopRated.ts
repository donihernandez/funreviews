import { client } from '@/utils/client';

const getTvTopRated = async (page = 1, limit = 0) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&page=${page}&language=en-US`,
    );

    if (res.data) {
        if (limit === 0) {
            return res.data;
        }
        const data = res.data;
        const limitedResults = data.results.slice(0, limit);
        data.results = limitedResults;
        return data;
    }

    return null;
};

export { getTvTopRated };

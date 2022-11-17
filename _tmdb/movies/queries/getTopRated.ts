import { client } from 'utils';

const getTopRated = async (limit = 0) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
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

export { getTopRated };

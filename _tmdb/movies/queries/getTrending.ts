import { client } from '@/utils/client';

const getTrending = async () => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getTrending };

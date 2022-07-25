import { client } from '@/utils/client';

const getWatchProviders = async (id: string) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getWatchProviders };

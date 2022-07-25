import { client } from '@/utils/client';

const getVideos = async (movie_id: number | string) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/movie/${movie_id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getVideos };

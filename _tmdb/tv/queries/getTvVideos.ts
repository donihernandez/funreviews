import { client } from '@/utils/client';

const getTvVideos = async (tv_id: number | string) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/tv/${tv_id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getTvVideos };

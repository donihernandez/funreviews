import { client } from '@/utils/client';

const getEpisodeVideos = async (
    tv_id: number | string,
    season_number: number | string,
    episode_number: number | string,
) => {
    const res = await client.get(
        // eslint-disable-next-line max-len
        `/tv/${tv_id}/season/${season_number}/episode/${episode_number}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
    );

    if (res?.data) {
        return res.data;
    }

    return null;
};

export { getEpisodeVideos };

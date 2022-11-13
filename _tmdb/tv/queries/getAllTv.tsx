import { client } from 'utils';

const getAllTv = async () => {
    const tvShows = [];
    let nextPage = 1;

    while (nextPage !== 400) {
        const res = await client.get(
            // eslint-disable-next-line max-len
            `/tv/popular?page=${nextPage}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        );

        if (res.data) {
            res.data.results.forEach(tv => tvShows.push(tv));
            nextPage++;
        }
    }

    return tvShows;
};

export { getAllTv };

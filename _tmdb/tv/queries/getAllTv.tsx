import { client } from 'utils';

const getAllTv = async () => {
    let isLast = false;
    const tvShows = [];
    let nextPage = 1;

    while (!isLast) {
        const res = await client.get(
            // eslint-disable-next-line max-len
            `/tv/popular?page=${nextPage}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        );

        if (res.data) {
            const currentPage = res.data.page;
            if (currentPage === res.data.total_pages) {
                isLast = true;
            }

            res.data.results.forEach(tv => tvShows.push(tv));
            nextPage++;
        }
    }

    return tvShows;
};

export { getAllTv };

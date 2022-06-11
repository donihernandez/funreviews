interface MovieGenres {
    genres: {
        id: number;
        name: string;
    }[];
}
const getGenres = (items: any, movieGenres: MovieGenres) => {
    const genres = items.map(item => item.genre_ids);
    const flatGenres = genres.flat();
    const uniqueGenres = [...new Set(flatGenres)];
    const genreNames = uniqueGenres.map(
        (genre: number) => movieGenres.genres.find(g => g.id === genre)?.name,
    );
    return genreNames;
};

export { getGenres };

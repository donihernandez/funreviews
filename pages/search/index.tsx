import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { Search } from '@/components/Search';

const SearchPage: NextPage = () => {
    return (
        <>
            <NextSeo
                canonical="https://funreviews.org/search"
                description="Search movies and tv shows"
                noindex
                title="Search | FunReviews"
            />
            <Search />
        </>
    );
};

export default SearchPage;

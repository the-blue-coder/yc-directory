import StartupCard, { TStartupCard } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Home: React.FC<THomeProps> = async ({ searchParams }) => {
    const query = (await searchParams).query;
    const posts = await client.fetch(STARTUPS_QUERY);

    return (
        <>
            <section className="pink_container">
                <h1 className="heading">
                    Pitch Your Startup,
                    <br /> Connect With Entrepreneurs
                </h1>

                <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

                <SearchForm query={query} />
            </section>

            <section className="section_container">
                <p className="text-30-semibold">{query ? `Search results for ${query}` : "All startups"}</p>

                <ul className="mt-7 card_grid">
                    {posts?.length > 0 ? (
                        posts?.map((post: TStartupCard) => <StartupCard key={post?._id} post={post} />)
                    ) : (
                        <p className="no-results">No statuts found</p>
                    )}
                </ul>
            </section>
        </>
    );
};

type THomeProps = {
    searchParams: Promise<{ query?: string }>;
};

export default Home;

import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

const Home: React.FC<THomeProps> = async ({ searchParams }) => {
    const query = (await searchParams).query;

    const posts = [
        {
            _createdAt: new Date(),
            views: 55,
            author: {
                _id: 1,
                name: "Adrian",
            },
            _id: 1,
            description: "This is a description",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhnX49OLtgTeMsXO8VIdD2IjtpH7XDDjmQNj_Vp-qKXbIqJwAlUVXIMyWGH9k-sW6tYI&usqp=CAU",
            category: "Robots",
            title: "We Robots",
        },
    ];

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
                    {posts?.length > 0 ? posts?.map((post) => <StartupCard key={post?._id} post={post} />) : <p className="no-results">No statuts found</p>}
                </ul>
            </section>
        </>
    );
};

type THomeProps = {
    searchParams: Promise<{ query?: string }>;
};

export default Home;

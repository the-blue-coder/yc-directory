import SearchForm from "../components/SearchForm";

const Home: React.FC<THomeProps> = async ({ searchParams }) => {
    const query = (await searchParams).query;

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
        </>
    );
};

type THomeProps = {
    searchParams: Promise<{ query?: string }>;
};

export default Home;

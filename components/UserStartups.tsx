import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { TStartupCard } from "./StartupCard";

const UserStartups: React.FC<TUserStartupsProps> = async ({ id }) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: TStartupCard) => <StartupCard key={startup._id} post={startup} />)
            ) : (
                <p className="no-result">No startups yet</p>
            )}
        </>
    );
};

type TUserStartupsProps = {
    id: string;
};

export default UserStartups;

import { client } from "@/sanity/lib/client";
import { STARTUP_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export const experimental_ppr = true;

const Startup: React.FC<TStartupProps> = async ({ params }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_ID_QUERY, { id });

    if (!post) {
        return notFound();
    }

    return (
        <>
            <h1 className="text-3xl">{post.title}</h1>
        </>
    );
};

type TStartupProps = { params: Promise<{ id: string }> };

export default Startup;

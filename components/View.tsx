import { client } from "@/sanity/lib/client";
import Ping from "./Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const View: React.FC<TViewProps> = async ({ id }) => {
    const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });

    after(
        async () =>
            await writeClient
                .patch(id)
                .set({ views: totalViews + 1 })
                .commit()
    );

    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>

            <p className="view-text">
                <span className="font-black">{totalViews} views</span>
            </p>
        </div>
    );
};

type TViewProps = {
    id: string;
};

export default View;

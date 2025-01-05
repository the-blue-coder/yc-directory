/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";

type TStartupProps = { params: Promise<{ id: string }> };

export const experimental_ppr = true;

const md = markdownit();

const Startup: React.FC<TStartupProps> = async ({ params }) => {
    const id = (await params).id;
    const post = await client.fetch(STARTUP_ID_QUERY, { id });

    if (!post) {
        return notFound();
    }

    const parsedContent = md.render(post?.pitch || "");

    return (
        <>
            <section className="pink_container !min-h-{230px}">
                <p className="tag">{formatDate(post?._createdAt)}</p>

                <h1 className="heading">{post.title}</h1>

                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>

            <section className="section_container">
                <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />

                <div className="space-y-5 mt-10 max-w-4-xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={post.author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />

                            <div>
                                <p className="text-20-medium">{post.author.name}</p>
                                <p className="text-20-medium !text-black-300">@{post.author.username}</p>
                            </div>
                        </Link>

                        <p className="category-tag">{post.category}</p>
                    </div>

                    <h3 className="text-30-bold">Pitch Details</h3>

                    {parsedContent ? (
                        <article className="prose max-x-4xl font-work-sans break-all" dangerouslySetInnerHTML={{ __html: parsedContent }} />
                    ) : (
                        <p className="no-result">No details provided</p>
                    )}
                </div>

                <hr className="divider" />
            </section>
        </>
    );
};

export default Startup;

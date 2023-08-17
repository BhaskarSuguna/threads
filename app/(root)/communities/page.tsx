import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Pagination from "@/components/shared/Pagination";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function Page({
    searchParams,
}: {
    searchParams: { [key: string]: string | undefined };
}) {
    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const result = await fetchCommunities({
        searchString: searchParams.q,
        pageNumber: searchParams?.page ? +searchParams.page : 1,
        pageSize: 25,
    });

    return (
        <>
            <h1 className='head-text'>Communities</h1>

            <Pagination
                path='communities'
                pageNumber={searchParams?.page ? +searchParams.page : 1}
                isNext={result.isNext}
            />
        </>
    );
}

export default Page;
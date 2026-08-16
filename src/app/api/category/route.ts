import { auth } from "@/lib/auth";
import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { ItemTypeEnum } from "@/models/dashboard/items";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get("type") as ItemTypeEnum | null;
    const filterByUser = request.nextUrl.searchParams.get("filterByUser");
    let userId = undefined;
    if (filterByUser === "true") {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session){ 
                  return NextResponse.json(
                    { error: "Unauthorized" },
                    { status: 401 }
                  );
        }
        userId = session.user.id;
    }
    const categories = await fetchCategoriesRepository(
        userId,
        type ?? undefined,
        
    );

    return NextResponse.json(categories);
}
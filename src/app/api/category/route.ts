import { fetchCategoriesRepository } from "@/lib/repository/category-repository";
import { ItemTypeEnum } from "@/models/dashboard/items";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const type = request.nextUrl.searchParams.get("type") as ItemTypeEnum | null;

    const categories = await fetchCategoriesRepository(
        type ?? undefined
    );

    return NextResponse.json(categories);
}
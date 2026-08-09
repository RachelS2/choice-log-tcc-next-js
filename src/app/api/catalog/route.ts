import { fetchCatalogItems } from "@/lib/repository/catalog-repository";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await fetchCatalogItems();

    return NextResponse.json(items);
  } catch (error) {
    console.error("Error fetching catalog:", error);

    return NextResponse.json(
      { error: "Failed to fetch catalog items" },
      { status: 500 }
    );
  }
}
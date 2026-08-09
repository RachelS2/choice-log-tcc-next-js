import { insertItem } from "@/lib/repository/catalog-repository";
import { getUserAuthData } from "@/lib/utils";
import { ItemModel } from "@/models/dashboard/items";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
  try {
    const body: ItemModel = await request.json();
    const userData = await getUserAuthData();

    if (!userData) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const item = await insertItem({ item: body ,  userId: userData.id,});

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);

    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}


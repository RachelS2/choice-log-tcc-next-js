import { auth } from "@/lib/auth";
import { fetchCatalogItemsRepository, postItemRepository, deleteItemRepository } from "@/lib/repository/item-repository";
import { ItemDisplayModel, ItemModel, ItemTypeEnum } from "@/models/dashboard/items";
import { NextResponse } from "next/server";
import { headers } from "next/headers";


export async function POST(request: Request) {
  try {
    const body: ItemModel = await request.json();
    const userData = await auth.api.getSession({ headers: await headers() });

    if (!userData) {
      console.log(userData)
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    const item = await postItemRepository({ item: body, userId: userData.user.id, });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating item:", error);

    return NextResponse.json(
      { error: "Failed to create item" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    console.log("Getting items");
    const typeParam = searchParams.get("type");

    let categoryType: ItemTypeEnum | undefined;

    if (typeParam) {
      if (!Object.values(["PRODUCT", "SERVICE"]).includes(typeParam.toUpperCase() as ItemTypeEnum)) {
        return NextResponse.json(
          { error: "Invalid category type" },
          { status: 400 }
        );
      }

      categoryType = typeParam as ItemTypeEnum;
    }

    const items: ItemDisplayModel[] =
      await fetchCatalogItemsRepository(categoryType);

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching catalog:", error);

    return NextResponse.json(
      { error: "Failed to fetch catalog items" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("itemId");

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const deletedItem = await deleteItemRepository({ itemId });

    return NextResponse.json(deletedItem, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);

    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
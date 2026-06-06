export type CreateItemViewDTO = {
  friendlyName: string;
  brand: string;
  categoryId: string;
  image?: string | null;
};

// await prisma.item.create({
//   data: {
//     ...dto,
//     userId,
//     type: "PRODUCT",
//     systemName: slugify(dto.friendlyName),
//   },
// });
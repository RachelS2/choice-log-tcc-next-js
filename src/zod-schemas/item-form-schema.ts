import { z } from 'zod';

export const newItemFormSchema = z.object({
  type: z.enum(['PRODUCT', 'SERVICE'], {
    required_error: 'Please select the item type.',
  }),
  categoryId: z.string().min(1, 'Category is required.'),
  friendlyName: z
    .string()
    .min(1, 'Friendly name is required.')
    .max(30, 'Maximum 30 characters.'),
  brand: z
    .string()
    .min(1, 'Brand / Provider is required.')
    .max(30, 'Maximum 30 characters.'),
  imageUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
});

export type NewItemFormSchema = z.infer<typeof newItemFormSchema>;
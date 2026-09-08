import { z } from 'zod';

export const itemFormSchema = z.object({
  type: z.enum(['PRODUCT', 'SERVICE'], {
    required_error: 'Please select the item type.',
  }),
  categoryId: z.string().min(1, 'Informe a categoria do item.'),
  friendlyName: z
    .string()
    .min(1, 'Informe o nome do item.')
    .max(30, 'Insira, no máximo, 30 caracteres.'),
  brand: z
    .string()
    .min(1, 'Informe a marca.')
    .max(30, 'Insira, no máximo, 30 caracteres.'),
  imageUrl: z.string().url('Must be a valid URL.').optional().or(z.literal('')),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;
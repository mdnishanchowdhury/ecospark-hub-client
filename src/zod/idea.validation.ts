import { z } from 'zod';

const ideaFields = {
    title: z.string().min(5, "Title must be at least 5 characters"),
    problemStatement: z.string().min(20, "Problem description is too short (min 20 chars)"),
    solution: z.string().min(20, "Solution details are too short (min 20 chars)"),
    description: z.string().min(50, "Detailed description must be at least 50 characters"),
    categoryId: z.string().uuid("Please select a valid category from the list"),
    isPaid: z.boolean().default(false),
    price: z.coerce.number().nonnegative("Price cannot be negative").optional().default(0),
    
    images: z.array(z.any())
        .min(2, "At least 2 images are required")
        .max(5, "Maximum 5 images allowed")
        .optional()
        .default([]),
};

export const createIdeaZodSchema = z.object(ideaFields)
    .refine((data) => {
        if (data.isPaid && (!data.price || data.price <= 0)) return false;
        return true;
    }, {
        message: "Price is required for paid ideas",
        path: ["price"],
    })
    .refine((data) => {
        return true; 
    });

export const ideaFieldsSchema = ideaFields;


export const createCategoryZodSchema = z.object({
    name: z.string().min(3, "Category name must be at least 3 characters"),
});
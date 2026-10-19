import vine from '@vinejs/vine'

export const createVisualReferenceValidator = vine.object({
    title: vine.string().trim().minLength(1).maxLength(255),
    category: vine.string().trim().minLength(1).maxLength(100),
    imageUrl: vine.string().trim().url().optional(),
    sourceUrl: vine.string().trim().url().optional(),
    notes: vine.string().trim().optional(),
})
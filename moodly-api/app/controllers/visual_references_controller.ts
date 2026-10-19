import type { HttpContext } from '@adonisjs/core/http'
import VisualReference from '#models/visual_reference'
import vine from '@vinejs/vine'
import { createVisualReferenceValidator } from '#validators/visual_reference'

export default class VisualReferencesController {
    async index({ response }: HttpContext) {
        const references = await VisualReference.all()

        return response.ok(references)
    }

    async show({ params, response }: HttpContext) {
        const reference = await VisualReference.find(params.id)

        if (!reference) {
            return response.notFound({ message: 'Référence introuvable' })
        }

        return response.ok(reference)
    }


    async store({ request, response }: HttpContext) {
        const payload = await vine.validate({
            schema: createVisualReferenceValidator,
            data: request.all(),
        })

        const reference = await VisualReference.create({
            title: payload.title,
            category: payload.category,
            imageUrl: payload.imageUrl ?? null,
            sourceUrl: payload.sourceUrl ?? null,
            notes: payload.notes ?? null,
            isFavorite: payload.isFavorite ?? false,
        })

        return response.created(reference)
    }


    async destroy({ params, response }: HttpContext) {
        const reference = await VisualReference.find(params.id)

        if (!reference) {
            return response.notFound({
                message: 'Référence introuvable',
            })
        }

        await reference.delete()

        return response.ok({
            message: 'Référence supprimée avec succès',
        })
    }


    async update({ params, request, response }: HttpContext) {
        const reference = await VisualReference.find(params.id)

        if (!reference) {
            return response.notFound({
                message: 'Référence introuvable',
            })
        }

        const payload = await vine.validate({
            schema: createVisualReferenceValidator,
            data: request.all(),
        })

        reference.title = payload.title
        reference.category = payload.category
        reference.imageUrl = payload.imageUrl ?? null
        reference.sourceUrl = payload.sourceUrl ?? null
        reference.notes = payload.notes ?? null

        await reference.save()

        return response.ok(reference)
    }


}

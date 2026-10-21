import type { HttpContext } from '@adonisjs/core/http'
import VisualReference from '#models/visual_reference'

import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'

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
        const image = request.file('image', {
            size: '5mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
        })

        if (image && !image.isValid) {
            return response.badRequest({
                message: 'Image invalide. Formats acceptés : JPG, PNG et WEBP, 5 Mo maximum.',
                errors: image.errors,
            })
        }

        const payload = await vine.validate({
            schema: createVisualReferenceValidator,
            data: request.all(),
        })

        let imageUrl = payload.imageUrl ?? null

        if (image) {
            const fileName = `${string.uuid()}.${image.extname}`

            await image.move(app.makePath('public/uploads'), {
                name: fileName,
            })

            if (!image.isValid) {
                return response.badRequest({
                    message: 'Impossible de traiter cette image.',
                    errors: image.errors,
                })
            }

            imageUrl = `/uploads/${fileName}`
        }

        const reference = await VisualReference.create({
            title: payload.title,
            category: payload.category,
            imageUrl,
            sourceUrl: payload.sourceUrl ?? null,
            notes: payload.notes ?? null,
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

        // 1. Récupérer le fichier image envoyé
        const image = request.file('image', {
            size: '2mb',
            extnames: ['jpg', 'jpeg', 'png', 'webp'],
        })

        if (image && !image.isValid) {
            return response.badRequest({
                message: 'Image invalide. Formats acceptés : JPG, PNG et WEBP, 2 Mo maximum.',
                errors: image.errors,
            })
        }

        // 2. Valider les champs texte
        const data = request.all()

        const payload = await vine.validate({
            schema: createVisualReferenceValidator,
            data: {
                ...data,
                sourceUrl: data.sourceUrl?.trim() || undefined,
                notes: data.notes?.trim() || undefined,
            },
        })

        // 3. Mettre à jour les informations
        reference.title = payload.title
        reference.category = payload.category
        reference.sourceUrl = payload.sourceUrl ?? null
        reference.notes = payload.notes ?? null

        // 4. Remplacer l'image uniquement si un nouveau fichier est envoyé
        if (image) {
            const fileName = `${string.uuid()}.${image.extname}`

            await image.move(app.makePath('public/uploads'), {
                name: fileName,
            })

            if (!image.isValid) {
                return response.badRequest({
                    message: 'Impossible de traiter cette image.',
                    errors: image.errors,
                })
            }

            reference.imageUrl = `/uploads/${fileName}`
        }

        await reference.save()

        return response.ok(reference)
    }



}

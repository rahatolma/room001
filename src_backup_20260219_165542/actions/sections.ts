'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function createSection(data: { title: string; isVisible: boolean; layoutType: string; socialSources: string[] }) {
    try {
        const session = await getSessionAction();
        if (!session) return { success: false, error: 'Unauthorized' };

        const newCollection = await prisma.collection.create({
            data: {
                userId: session.id,
                title: data.title,
                slug: `${data.title.toLowerCase().replace(/\s+/g, '-')}-${uuidv4().substring(0, 8)}`,
                layoutType: data.layoutType,
                isPublic: data.isVisible,
                // socialSources could be stored in a JSON field if added to schema, or metadata
            }
        });

        revalidatePath(`/dashboard/sections`);
        revalidatePath(`/${session.username}`); // Revalidate public page

        return { success: true, section: newCollection };
    } catch (error) {
        console.error("Error creating section:", error);
        return { success: false, error: 'Failed to create section' };
    }
}

export async function updateSection(id: string, data: { title: string; isVisible: boolean; layoutType: string; socialSources: string[] }) {
    try {
        const session = await getSessionAction();
        if (!session) return { success: false, error: 'Unauthorized' };

        // Verify ownership
        const existing = await prisma.collection.findUnique({ where: { id } });
        if (!existing || existing.userId !== session.id) {
            return { success: false, error: 'Unauthorized or not found' };
        }

        const updatedCollection = await prisma.collection.update({
            where: { id },
            data: {
                title: data.title,
                isPublic: data.isVisible,
                layoutType: data.layoutType,
                // socialSources mapping if needed
            }
        });

        revalidatePath(`/dashboard/sections`);
        revalidatePath(`/${session.username}`);

        return { success: true, section: updatedCollection };
    } catch (error) {
        console.error("Error updating section:", error);
        return { success: false, error: 'Failed to update section' };
    }
}

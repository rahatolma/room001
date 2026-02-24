'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function submitFeedback(data: { content: string; type: string; url: string; userId?: string }) {
    try {
        await prisma.feedback.create({
            data: {
                content: data.content,
                type: data.type,
                url: data.url,
                userId: data.userId || null,
            }
        });

        return { success: true };
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return { success: false, error: 'Geri bildirim gönderilirken bir hata oluştu.' };
    }
}

'use server';

import { getSessionAction } from './auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Simple slugify helper
function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-')   // Replace multiple - with single -
        .replace(/^-+/, '')       // Trim - from start of text
        .replace(/-+$/, '');      // Trim - from end of text
}

export async function requestCircleCreation(state: any, formData: FormData) {
    const user = await getSessionAction();

    if (!user) {
        return { success: false, message: 'Giriş yapmalısınız.' };
    }

    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!name || !description) {
        return { success: false, message: 'Lütfen tüm alanları doldurun.' };
    }

    const slug = slugify(name) + '-' + Math.random().toString(36).substring(7);

    try {
        await prisma.circle.create({
            data: {
                name,
                description,
                slug,
                creatorId: user.id,
                status: 'pending', // Onay bekliyor
                type: 'public',
                members: {
                    create: {
                        userId: user.id,
                        role: 'admin',
                        status: 'approved' // Kurucu otomatik onaylı
                    }
                }
            }
        });

        revalidatePath('/circles');
        return { success: true, message: 'Topluluk başvurunuz alındı. Yönetici onayından sonra yayınlanacaktır.' };
    } catch (error) {
        console.error('Error creating circle request:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function requestJoinCircle(circleId: string) {
    const user = await getSessionAction();

    if (!user) {
        return { success: false, message: 'Giriş yapmalısınız.' };
    }

    try {
        const existingMember = await prisma.circleMember.findUnique({
            where: {
                circleId_userId: {
                    circleId,
                    userId: user.id
                }
            }
        });

        if (existingMember) {
            if (existingMember.status === 'pending') {
                return { success: false, message: 'Zaten başvuru yaptınız, onay bekleniyor.' };
            }
            return { success: false, message: 'Zaten bu topluluğun üyesisiniz.' };
        }

        await prisma.circleMember.create({
            data: {
                circleId,
                userId: user.id,
                role: 'member',
                status: 'pending' // Onay bekliyor
            }
        });

        revalidatePath(`/circles`);
        // We might need to revalidate the specific circle page too, but we don't have slug here easily without check.
        // It's fine, the component will fetch fresh data.

        return { success: true, message: 'Katılma isteği gönderildi.' };

    } catch (error) {
        console.error('Error joining circle:', error);
        return { success: false, message: 'Bir hata oluştu.' };
    }
}

export async function getCircleMembershipStatus(circleId: string) {
    const user = await getSessionAction();
    if (!user) return null;

    const membership = await prisma.circleMember.findUnique({
        where: {
            circleId_userId: {
                circleId,
                userId: user.id
            }
        }
    });

    return membership ? membership.status : null;
}

'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from './auth';

export async function submitCreatorApplication(data: any) {
    const user = await getSessionAction();
    // This action is called after OTP login, so session should exist.
    if (!user) return { success: false, error: 'Oturum bulunamadı. Lütfen tekrar giriş yapın.' };

    try {
        // Update user profile
        // Ensure role is creator
        await prisma.user.update({
            where: { id: user.id },
            data: {
                role: 'creator',
                applicationStatus: 'approved',
                // phoneNumber is already set during OTP
            }
        });

        // Add Social Accounts
        if (data.socials && data.socials.instagram) {
            // Check if exists
            const existing = await prisma.socialAccount.findUnique({
                where: {
                    userId_platform: {
                        userId: user.id,
                        platform: 'instagram'
                    }
                }
            });

            if (!existing) {
                await prisma.socialAccount.create({
                    data: {
                        userId: user.id,
                        platform: 'instagram',
                        username: data.socials.instagram
                    }
                });
            }
        }

        return { success: true };
    } catch (error) {
        console.error("Error submitting application:", error);
        return { success: false, error: 'Başvuru tamamlanamadı.' };
    }
}

export async function submitBrandApplication(data: any) {
    // Public action, no session required
    // Validate inputs
    if (!data.website || !data.industry || !data.role) {
        return { success: false, error: 'Eksik bilgi.' };
    }

    try {
        // Create a Brand Application record. 
        // Currently we use the 'Brand' model which has status 'pending'.
        // We don't create a User yet.

        const slug = data.website
            .replace(/^https?:\/\//, '')
            .replace(/www\./, '')
            .split('/')[0]
            .split('.')[0]
            + '-' + Math.floor(Math.random() * 1000);

        await prisma.brand.create({
            data: {
                name: data.website, // Using website as temp name if no company name provided
                slug: slug,
                websiteUrl: data.website,
                contactName: data.role, // Storing role here for now or update schema later
                status: 'pending',
                niche: data.industry
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Error submitting brand application:", error);
        return { success: false, error: 'Başvuru alınamadı.' };
    }
}

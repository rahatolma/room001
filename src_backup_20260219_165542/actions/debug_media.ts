'use server';

import prisma from '@/lib/prisma';
import { getSessionAction } from '@/actions/auth';
import { revalidatePath } from 'next/cache';

export async function ensureMockUserExists() {
    const session = await getSessionAction();
    if (!session) {
        console.log("No session found");
        return { success: false, message: "No session" };
    }

    console.log("Checking user:", session.id);

    let user = await prisma.user.findUnique({
        where: { id: session.id }
    });

    if (!user) {
        console.log("User not found by ID. Checking by email...", session.email);

        // CHeck if email exists
        const existingByEmail = await prisma.user.findUnique({
            where: { email: session.email }
        });

        if (existingByEmail) {
            console.log("User found by email, but ID mismatch. Using existing user.");
            // We can't easily change the ID of the session or the DB record here without creating mess.
            // But since getTalentProfile queries by ID (session.id), we have a disconnect.

            // Critical Fix: If we are in MOCK mode (creator_1), we MUST have the DB record have ID='creator_1'.
            // If the existing user has a different ID, we should probably DELETE it and recreate it as creator_1
            // for the sake of the demo.

            console.warn(`Deleting conflicting user ${existingByEmail.id} to enforce mock ID ${session.id}`);
            await prisma.user.delete({ where: { id: existingByEmail.id } });
        }

        console.log("Creating fresh user for session:", session.id);
        user = await prisma.user.create({
            data: {
                id: session.id,
                email: session.email,
                username: session.username,
                fullName: session.fullName,
                role: session.role || 'creator',
                avatarUrl: session.avatarUrl,
                bio: 'Moda ve yaşam tarzı içerikleri üretiyorum. Estetik ve minimal tasarımları seviyorum.',
                niche: 'Moda & Tasarım',
                location: 'İstanbul, TR',
                websiteUrl: 'https://shopmy.tr/@asenasaribatur',
                productsSharedCount: 142,
                profileViewCount: 15403,
                instagramFollowerCount: 125000
            }
        });

        // Also add a social account
        await prisma.socialAccount.create({
            data: {
                userId: user.id,
                platform: 'Instagram',
                username: 'asenasaribatur',
                followerCount: 125000
            }
        });
    } else {
        console.log("User found:", user);
    }

    revalidatePath('/dashboard/media-kit');
    return { success: true, user };
}

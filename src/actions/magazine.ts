"use server";

import prisma from "@/lib/prisma";

export async function getPublicMagazines() {
    try {
        const magazines = await prisma.magazine.findMany({
            where: {
                isPublic: true,
            },
            include: {
                user: {
                    select: {
                        fullName: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Map to GridItem format
        return magazines.map((mag) => ({
            id: mag.id,
            title: mag.title,
            slug: mag.id, // Using ID as slug for now, or could add an explicitly slug field later
            imageUrl: mag.coverImageUrl || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", // Fallback image
            subtitle: mag.user?.fullName || mag.user?.username || "Editör",
        }));
    } catch (error) {
        console.error("Error fetching public magazines:", error);
        return [];
    }
}

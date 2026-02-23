'use server';

import { getSessionAction } from '@/actions/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function seedFinancialData() {
    const session = await getSessionAction();
    if (!session) return { success: false, error: 'Unauthorized' };
    const userId = session.id;

    try {
        // 1. Clear existing for this user (optional, for clean slate)
        await prisma.transaction.deleteMany({ where: { userId } });
        await prisma.payout.deleteMany({ where: { userId } });

        // 2. Add Transactions
        // A. Approved Commission (Old)
        await prisma.transaction.create({
            data: {
                userId,
                type: 'COMMISSION',
                amount: 150.50,
                status: 'APPROVED',
                description: 'Trendyol - Kazak Satışı',
                sourceType: 'PRODUCT',
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) // 5 days ago
            }
        });

        // B. Pending Commission (Recent)
        await prisma.transaction.create({
            data: {
                userId,
                type: 'COMMISSION',
                amount: 75.00,
                status: 'PENDING',
                description: 'Hepsiburada - Kulaklık',
                sourceType: 'PRODUCT',
                createdAt: new Date(),
                toBePaidAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14) // in 14 days
            }
        });

        // C. Referral Bonus
        await prisma.transaction.create({
            data: {
                userId,
                type: 'REFERRAL',
                amount: 500.00,
                status: 'APPROVED',
                description: 'Arkadaş Daveti: @aysek',
                sourceType: 'USER_REFERRAL',
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10)
            }
        });

        // D. Payout (Paid)
        const payout = await prisma.payout.create({
            data: {
                userId,
                amount: 1000.00,
                status: 'PAID',
                iban: 'TR90 0000 0000 0000 0000 0000 00',
                processedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)
            }
        });

        await prisma.transaction.create({
            data: {
                userId,
                type: 'PAYOUT',
                amount: -1000.00,
                status: 'PAID',
                description: 'Ödeme Talebi (Şubat)',
                sourceType: 'PAYOUT',
                sourceId: payout.id,
                createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20)
            }
        });

        // Update User Earnings Cache (if needed, though we calculate on fly)
        // await prisma.user.update({ where: { id: userId }, data: { totalEarnings: ... } });

        revalidatePath('/dashboard/earnings');
        return { success: true };
    } catch (error) {
        console.error("Seeding failed:", error);
        return { success: false, error: 'Failed to seed' };
    }
}

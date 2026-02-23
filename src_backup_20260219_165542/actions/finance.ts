'use server';

import { getSessionAction } from '@/actions/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getFinancialSummary() {
    try {
        const session = await getSessionAction();
        if (!session) return null;

        const userId = session.id;

        // 1. Calculate Totals from Ledger
        const transactions = await prisma.transaction.findMany({
            where: { userId }
        });

        // Total Earnings (All time positive transactions)
        const totalEarnings = transactions
            .filter(t => t.amount.toNumber() > 0)
            .reduce((acc, t) => acc + t.amount.toNumber(), 0);

        // Pending Balance (Pending transactions)
        const pendingBalance = transactions
            .filter(t => t.status === 'PENDING')
            .reduce((acc, t) => acc + t.amount.toNumber(), 0);

        // Available Balance (Approved positive - Approved negative)
        // Note: Payouts are negative amounts
        const approvedTransactions = transactions.filter(t => t.status === 'APPROVED' || t.status === 'PAID');
        const availableBalance = approvedTransactions.reduce((acc, t) => acc + t.amount.toNumber(), 0);

        // Last Payout
        const lastPayout = await prisma.payout.findFirst({
            where: { userId, status: 'PAID' },
            orderBy: { processedAt: 'desc' }
        });

        return {
            totalEarnings,
            pendingBalance,
            availableBalance,
            lastPayoutAmount: lastPayout?.amount.toNumber() || 0,
            currency: 'TRY'
        };

    } catch (error) {
        console.error("Error fetching financial summary:", error);
        return null;
    }
}

export async function getTransactions(limit = 20) {
    try {
        const session = await getSessionAction();
        if (!session) return [];

        return await prisma.transaction.findMany({
            where: { userId: session.id },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

export async function requestPayout(amount: number, iban: string) {
    try {
        const session = await getSessionAction();
        if (!session) return { success: false, error: 'Unauthorized' };

        const summary = await getFinancialSummary();
        if (!summary || summary.availableBalance < amount) {
            return { success: false, error: 'Yetersiz bakiye.' };
        }

        // 1. Create Payout Record
        const payout = await prisma.payout.create({
            data: {
                userId: session.id,
                amount: amount,
                iban: iban,
                status: 'PROCESSING'
            }
        });

        // 2. Create Ledger Transaction (Negative)
        await prisma.transaction.create({
            data: {
                userId: session.id,
                type: 'PAYOUT',
                amount: -amount,
                status: 'APPROVED', // Immediately approved as pending deduction
                sourceType: 'PAYOUT_REQUEST',
                sourceId: payout.id,
                description: 'Ödeme Talebi'
            }
        });

        revalidatePath('/dashboard/earnings');
        return { success: true };

    } catch (error) {
        console.error("Payout request failed:", error);
        return { success: false, error: 'İşlem başarısız.' };
    }
}

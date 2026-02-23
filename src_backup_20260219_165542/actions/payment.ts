'use server';

import { getSessionAction } from './auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createPaymentIntent(packageId: string) {
    const user = await getSessionAction();
    if (!user) return { success: false, message: 'Giriş yapmalısınız.' };

    let amount = 0;
    let description = '';

    // Simple package logic
    switch (packageId) {
        case 'boost_1_week':
            amount = 500;
            description = '1 Hafta Ana Sayfa Vitrini';
            break;
        case 'boost_1_month':
            amount = 1500;
            description = '1 Ay Ana Sayfa Vitrini';
            break;
        default:
            return { success: false, message: 'Geçersiz paket.' };
    }

    try {
        // 1. Create a Pending Payment Record
        const payment = await prisma.payment.create({
            data: {
                userId: user.id,
                amount: amount,
                currency: 'TRY',
                status: 'pending',
                provider: 'iyzico_simulation', // Identifying as simulation
                type: 'PROMOTION',
                targetId: user.id, // Promoting themselves
            }
        });

        // In a real app, here we would call Iyzico API to Initialize Payment 
        // and return the HTML content or Checkout Form URL.

        return {
            success: true,
            paymentId: payment.id,
            amount,
            description
        };

    } catch (error) {
        console.error('Payment intent error:', error);
        return { success: false, message: 'Ödeme başlatılamadı.' };
    }
}

export async function completePaymentSimulation(paymentId: string) {
    // This action simulates the "Callback" from Iyzico
    try {
        await prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'success', externalId: `sim_${Date.now()}` }
        });

        // Here we would also trigger the business logic:
        // e.g. Add user to "FeaturedCurators" table or update their boost_expiry date
        // For now, we just record the money.

        revalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        return { success: false, message: 'İşlem tamamlanamadı.' };
    }
}

'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Toaster, toast } from 'sonner';

function ToastLogic({ toastParam }: { toastParam?: string }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (toastParam === 'offer_accepted') {
            toast.success('Marka teklifi kabul edildi ve ürünler linklerine eklendi! 🎉', {
                duration: 5000,
                position: 'top-center'
            });

            // Clean up URL
            const params = new URLSearchParams(searchParams.toString());
            params.delete('toast');
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [toastParam, router, pathname, searchParams]);

    return null;
}

export default function ToastHandler({ toastParam }: { toastParam?: string }) {
    return (
        <Suspense fallback={null}>
            <ToastLogic toastParam={toastParam} />
            <Toaster richColors />
        </Suspense>
    );
}

'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';

export default function HeaderWrapper() {
    const pathname = usePathname();

    // Always show header
    // if (pathname?.startsWith('/dashboard')) {
    //    return null;
    // }

    return <Header />;
}

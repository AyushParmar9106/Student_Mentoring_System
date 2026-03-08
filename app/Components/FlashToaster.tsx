'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { triggerToast } from '@/app/lib/toastUtils';
import { Toaster } from 'react-hot-toast';

export default function FlashToaster() {
    const pathname = usePathname();

    useEffect(() => {
        // Read the "flash" cookie on mount and on route changes
        const cookies = document.cookie.split('; ');
        const flashCookie = cookies.find(row => row.startsWith('flash='));

        if (flashCookie) {
            try {
                // Next.js (or the browser) might encode cookies multiple times
                let decodedString = flashCookie.substring('flash='.length);

                // Safely decode until no more % are found, or max 3 times to prevent loops
                let attempts = 0;
                while (decodedString.includes('%') && attempts < 3) {
                    decodedString = decodeURIComponent(decodedString);
                    attempts++;
                }

                const flashData = JSON.parse(decodedString);

                // Trigger the corresponding toast
                if (flashData && flashData.type && flashData.message) {
                    triggerToast(flashData.type, flashData.message);
                }
            } catch (e) {
                console.error("Failed to parse flash cookie", e);
            }

            // Delete the cookie now that we've read it
            document.cookie = 'flash=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;';
        }
    }, [pathname]); // Depend on pathname to re-run on navigation

    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                className: 'bg-body text-body shadow-sm border border-secondary-subtle',
            }}
        />
    );
}

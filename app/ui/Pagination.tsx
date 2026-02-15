'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <nav aria-label="Pagination" className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                    <Link
                        className="page-link rounded-start-pill"
                        href={createPageURL(currentPage - 1)}
                        aria-disabled={currentPage <= 1}
                    >
                        <i className="bi bi-chevron-left me-1"></i>Previous
                    </Link>
                </li>

                <li className="page-item disabled">
                    <span className="page-link border-top border-bottom border-start-0 border-end-0">
                        Page {currentPage} of {totalPages}
                    </span>
                </li>

                <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                    <Link
                        className="page-link rounded-end-pill"
                        href={createPageURL(currentPage + 1)}
                        aria-disabled={currentPage >= totalPages}
                    >
                        Next<i className="bi bi-chevron-right ms-1"></i>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

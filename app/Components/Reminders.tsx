import { prisma } from "@/app/lib/prisma";
import Link from "next/link";

export default async function Reminders() {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // 1. Get Session for User ID and Role
    const { getSession } = await import("../lib/auth");
    const session = await getSession();

    // If no session, return nothing (or handle as needed)
    if (!session?.user) return null;

    const userRole = session.user.role;
    const userId = session.user.id;

    // 2. Build Dynamic Where Clause
    const whereClause: any = {
        NextMentoringDate: {
            gte: new Date(),
            lte: sevenDaysFromNow,
        },
    };

    if (userRole === 'Student') {
        whereClause.studentmentor = {
            StudentID: userId
        };
    } else if (userRole === 'Staff' && !session.user.isAdmin) {
        // Assuming 'isAdmin' check or justrole check based on your auth logic
        // If staff can be admin, handle accordingly. 
        whereClause.studentmentor = {
            StaffID: userId
        };
    }

    const upcomingMentoring = await prisma.studentmentoring.findMany({
        where: whereClause,
        include: {
            studentmentor: {
                include: {
                    students: true,
                    staff: true,
                },
            },
        },
        orderBy: {
            NextMentoringDate: "asc",
        },
        take: 5,
    });

    if (upcomingMentoring.length === 0) {
        return null;
    }

    return (
        <div className="card shadow-sm border-0 mb-4 bg-body rounded-4 overflow-hidden">
            <div className="card-header bg-warning-subtle border-0 py-3">
                <h5 className="card-title mb-0 text-warning-emphasis fw-bold d-flex align-items-center">
                    <i className="bi bi-bell-fill me-2 fs-5"></i>
                    <span>Upcoming Mentoring Sessions</span>
                    <span className="badge bg-warning text-dark ms-2 rounded-pill small">Next 7 Days</span>
                </h5>
            </div>
            <div className="list-group list-group-flush">
                {upcomingMentoring.map((session) => (
                    <div key={session.StudentMentoringID} className="list-group-item d-flex justify-content-between align-items-center hover-bg-body-tertiary transition-colors">
                        <div>
                            <div className="fw-bold text-body mb-1">{session.studentmentor.students.StudentName}</div>
                            <div className="text-body-secondary small d-flex align-items-center">
                                <i className="bi bi-person-badge me-1"></i>
                                {session.studentmentor.staff.StaffName}
                            </div>
                        </div>
                        <div className="text-end">
                            <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill mb-1 px-3">
                                {session.NextMentoringDate?.toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                            </span>
                            <br />
                            <small className={`fw-bold ${Math.ceil((session.NextMentoringDate!.getTime() - new Date().getTime()) / (1000 * 3600 * 24)) <= 2
                                ? 'text-danger'
                                : 'text-body-secondary'
                                }`}>
                                {session.NextMentoringDate ?
                                    Math.ceil((session.NextMentoringDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)) + ' days left'
                                    : ''}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
            <div className="card-footer bg-body-tertiary border-0 text-center py-3">
                <Link href="/studentmentoring" className="btn btn-sm btn-outline-warning text-body-emphasis fw-bold px-4 rounded-pill">
                    View All Sessions <i className="bi bi-arrow-right ms-1"></i>
                </Link>
            </div>
        </div>
    );
}

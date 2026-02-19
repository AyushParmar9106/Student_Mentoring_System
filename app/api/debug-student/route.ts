
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
    const student = await prisma.students.findUnique({
        where: { StudentID: 2 },
        include: {
            studentmentor: {
                include: {
                    studentmentoring: { orderBy: { DateOfMentoring: 'desc' } }
                }
            }
        }
    });
    return NextResponse.json(student);
}

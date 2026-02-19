import { AddMentoring } from '../AddMentoring'
import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'

jest.mock('@/app/lib/prisma', () => ({
    prisma: {
        studentmentoring: {
            create: jest.fn(),
        },
    },
}))

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))

// Mock fs/promises since AddMentoring uses it
jest.mock('fs/promises', () => ({
    writeFile: jest.fn().mockResolvedValue(undefined),
    mkdir: jest.fn().mockResolvedValue(undefined),
}))

describe('AddMentoring Server Action', () => {

    // Mock successful file upload
    const mockFilePayload = (fileSize = 100) => {
        const blob = new Blob(['a'.repeat(fileSize)], { type: 'text/plain' });
        return blob as unknown as File; // Cast for TS
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create mentoring record successfully', async () => {
        const formData = new FormData()
        formData.append('assignmentId', '1')
        formData.append('date', '2023-10-27')
        formData.append('attendance', 'Present')
        formData.append('stress', 'Low')
        formData.append('agenda', 'Study Plan')
        formData.append('issues', 'None')
        formData.append('learnerType', 'Visual')
        formData.append('staffOpinion', 'Good')
        formData.append('studentOpinion', 'Helpful')
        // ... add other required fields ...

        await AddMentoring(formData)

        expect(prisma.studentmentoring.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    StudentMentorID: 1,
                    AttendanceStatus: 'Present',
                }),
            })
        )
        expect(redirect).toHaveBeenCalledWith('/studentmentoring')
    })

    it('should handle missing next date', async () => {
        const formData = new FormData()
        formData.append('assignmentId', '1')
        formData.append('date', '2023-10-27')
        formData.append('attendance', 'Present')
        // ...

        await AddMentoring(formData)

        expect(prisma.studentmentoring.create).toHaveBeenCalledWith(
            expect.objectContaining({
                data: expect.objectContaining({
                    NextMentoringDate: null,
                }),
            })
        )
    })
})

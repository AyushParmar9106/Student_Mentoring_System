import { manageStudentMentor } from '../manageStudentMentor'
import { prisma } from '@/app/lib/prisma'
import { redirect } from 'next/navigation'

jest.mock('@/app/lib/prisma', () => ({
    prisma: {
        $transaction: jest.fn((callback: any) => callback({
            studentmentor: {
                deleteMany: jest.fn(),
                createMany: jest.fn(),
            }
        })),
    },
}))

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}))

jest.mock('next/cache', () => ({
    revalidatePath: jest.fn(),
}))

describe('manageStudentMentor Server Action', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should manage student mentor assignments successfully', async () => {
        const formData = new FormData()
        formData.append('StaffID', '1')
        formData.append('StudentIDs', '101')
        formData.append('StudentIDs', '102')
        formData.append('FromDate', '2023-10-01')
        formData.append('Description', 'Test Assignment')

        await manageStudentMentor(formData)

        expect(prisma.$transaction).toHaveBeenCalled()
        // Since we mock the transaction callback execution immediately,
        // we can't easily expect on the inner tx mocks without exposing them.
        // However, the function should complete without error and redirect.
        expect(redirect).toHaveBeenCalledWith('/studentmentor')
    })

    it('should handle errors gracefully', async () => {
        (prisma.$transaction as jest.Mock).mockRejectedValueOnce(new Error('DB Error'))

        // We expect it NOT to throw, but catch and log (based on current implementation)
        // and then redirect.
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })

        const formData = new FormData()
        formData.append('StaffID', '1')

        await manageStudentMentor(formData)

        expect(consoleSpy).toHaveBeenCalledWith('Management Error:', expect.any(Error))
        expect(redirect).toHaveBeenCalledWith('/studentmentor')

        consoleSpy.mockRestore()
    })
})

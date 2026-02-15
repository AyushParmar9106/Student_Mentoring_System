'use server'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function editStudentMentoring(formData: FormData) {
  // Convert ID to a number safely
  const id = Number(formData.get('StudentMentoringID'))

  // Handle File Upload
  const file = formData.get('file') as File | null
  let filePath = undefined // Undefined means "do not update" in Prisma

  if (file && file.size > 0) {
    const fs = require('fs/promises')
    const path = require('path')

    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'public/uploads')
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(path.join(uploadDir, filename), buffer)

    filePath = `/uploads/${filename}`
  }

  await prisma.studentmentoring.update({
    where: { StudentMentoringID: id },
    data: {
      // Cast values to strings to match your Prisma Schema
      DateOfMentoring: new Date(formData.get('date') as string),
      AttendanceStatus: formData.get('attendance') as string,
      StressLevel: formData.get('stress') as string,
      MentoringMeetingAgenda: formData.get('agenda') as string,
      IssuesDiscussed: formData.get('issues') as string,
      LearnerType: formData.get('learnerType') as string,
      // Handle optional date
      NextMentoringDate: formData.get('nextDate')
        ? new Date(formData.get('nextDate') as string)
        : null,
      StaffOpinion: formData.get('staffOpinion') as string,

      // NEW FIELDS for Week 8 Completion
      StudentsOpinion: formData.get('studentOpinion') as string,
      IsParentPresent: formData.get('isParentPresent') === 'on', // Checkbox returns 'on' if checked
      ParentName: (formData.get('parentName') as string) || null,
      ParentMobileNo: (formData.get('parentMobile') as string) || null,
      ParentsOpinion: (formData.get('parentOpinion') as string) || null,

      // Update file only if a new one is uploaded
      ...(filePath && { MentoringDocument: filePath }),

      Modified: new Date()
    }
  })

  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}

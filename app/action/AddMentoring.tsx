'use server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function AddMentoring(formData: FormData) {
  const assignmentId = Number(formData.get('assignmentId'))

  // Handle File Upload
  const file = formData.get('file') as File | null
  let filePath = null

  if (file && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')

    try {
      await mkdir(uploadDir, { recursive: true })
      await writeFile(path.join(uploadDir, filename), buffer)
      filePath = `/uploads/${filename}`
    } catch (e) {
      console.error('File upload failed:', e)
      // Decide if we want to fail the whole request or just skip the file.
      // For now, we'll proceed without the file if upload fails, or throw.
      // Let's log it and proceed.
    }
  }

  await prisma.studentmentoring.create({
    data: {
      StudentMentorID: assignmentId,
      DateOfMentoring: new Date(formData.get('date') as string),
      AttendanceStatus: formData.get('attendance') as string,
      StressLevel: formData.get('stress') as string,
      MentoringMeetingAgenda: formData.get('agenda') as string,
      IssuesDiscussed: formData.get('issues') as string,
      LearnerType: formData.get('learnerType') as string,
      NextMentoringDate: formData.get('nextDate')
        ? new Date(formData.get('nextDate') as string)
        : null,
      StaffOpinion: formData.get('staffOpinion') as string,
      MentoringDocument: filePath, // Save the file path

      // NEW FIELDS for Week 9 Completeness (Student/Parent)
      StudentsOpinion: formData.get('studentOpinion') as string,
      IsParentPresent: formData.get('isParentPresent') === 'on',
      ParentName: (formData.get('parentName') as string) || null,
      ParentMobileNo: (formData.get('parentMobile') as string) || null,
      ParentsOpinion: (formData.get('parentOpinion') as string) || null
    }
  })

  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}

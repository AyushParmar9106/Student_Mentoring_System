'use server'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { editMentoringSessionSchema } from '@/app/lib/zodSchemas'

export async function editStudentMentoring(prevState: any, formData: FormData) {
  const validatedFields = editMentoringSessionSchema.safeParse({
    StudentMentoringID: formData.get('StudentMentoringID'),
    date: formData.get('date'),
    attendance: formData.get('attendance'),
    stress: formData.get('stress'),
    agenda: formData.get('agenda'),
    issues: formData.get('issues'),
    learnerType: formData.get('learnerType'),
    nextDate: formData.get('nextDate') || undefined,
    staffOpinion: formData.get('staffOpinion') || undefined,
    studentOpinion: formData.get('studentOpinion') || undefined,
    isParentPresent: formData.get('isParentPresent') === 'on',
    parentName: formData.get('parentName') || undefined,
    parentMobile: formData.get('parentMobile') || undefined,
    parentOpinion: formData.get('parentOpinion') || undefined,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted fields for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const fileUrl = formData.get('fileUrl') as string | null
  let filePath = fileUrl || undefined

  const {
    StudentMentoringID,
    date,
    attendance,
    stress,
    agenda,
    issues,
    learnerType,
    nextDate,
    staffOpinion,
    studentOpinion,
    isParentPresent,
    parentName,
    parentMobile,
    parentOpinion,
  } = validatedFields.data

  await prisma.studentmentoring.update({
    where: { StudentMentoringID: Number(StudentMentoringID) },
    data: {
      DateOfMentoring: new Date(date),
      AttendanceStatus: attendance,
      StressLevel: stress,
      MentoringMeetingAgenda: agenda,
      IssuesDiscussed: issues,
      LearnerType: learnerType,
      NextMentoringDate: nextDate ? new Date(nextDate) : null,
      StaffOpinion: staffOpinion || '',

      // NEW FIELDS for Week 8 Completion
      StudentsOpinion: studentOpinion || '',
      IsParentPresent: isParentPresent || false, // Checkbox returns 'on' if checked
      ParentName: parentName || null,
      ParentMobileNo: parentMobile || null,
      ParentsOpinion: parentOpinion || null,

      // Update file only if a new one is uploaded
      ...(filePath && { MentoringDocument: filePath }),
      Modified: new Date()
    }
  })

    // Clear the cache and redirect
    ; (await cookies()).set('flash', encodeURIComponent(JSON.stringify({ type: 'update', message: 'Mentoring session updated!' })), { path: '/' });

  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}

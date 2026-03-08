'use server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { mentoringSessionSchema } from '@/app/lib/zodSchemas'

export async function AddMentoring(prevState: any, formData: FormData) {
  const fileUrl = formData.get('fileUrl') as string | null
  let filePath = fileUrl || undefined

  const validatedFields = mentoringSessionSchema.safeParse({
    assignmentId: formData.get('assignmentId'),
    date: formData.get('date'),
    attendance: formData.get('attendance'),
    stress: formData.get('stress'),
    agenda: formData.get('agenda'),
    issues: formData.get('issues'),
    learnerType: formData.get('learnerType'),
    nextDate: formData.get('nextDate'),
    staffOpinion: formData.get('staffOpinion'),
    studentOpinion: formData.get('studentOpinion'),
    isParentPresent: formData.get('isParentPresent') === 'on',
    parentName: formData.get('parentName'),
    parentMobile: formData.get('parentMobile'),
    parentOpinion: formData.get('parentOpinion'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please review the highlighted fields for errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const {
    assignmentId,
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


  try {
    await prisma.studentmentoring.create({
      data: {
        StudentMentorID: Number(assignmentId),
        DateOfMentoring: new Date(date),
        AttendanceStatus: attendance,
        StressLevel: stress,
        MentoringMeetingAgenda: agenda,
        IssuesDiscussed: issues,
        LearnerType: learnerType,
        NextMentoringDate: nextDate ? new Date(nextDate) : null,
        StaffOpinion: staffOpinion || '',
        MentoringDocument: filePath, // Save the file path

        // NEW FIELDS for Week 9 Completeness (Student/Parent)
        StudentsOpinion: studentOpinion || '',
        IsParentPresent: isParentPresent || false,
        ParentName: parentName || null,
        ParentMobileNo: parentMobile || null,
        ParentsOpinion: parentOpinion || null
      }
    })
  } catch (e: any) {
    console.error('Failed to create mentoring record:', e)
    // In a real app, you might return state to the form to show an error message.
    // For now, allow the error to bubble up or redirect to an error page if critical.
    // If P2002 (Unique constraint), handling it specifically:
    if (e.code === 'P2002') {
      console.error('Unique constraint violation:', e.meta)
      // You could redirect to a specific error page or return a value
      return { success: false, message: 'This record already exists.' }
    }
    return { success: false, message: 'An unexpected error occurred.' }
  }

  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}

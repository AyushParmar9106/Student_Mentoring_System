'use server'
import { prisma } from '@/app/lib/prisma'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function AddMentoring (formData: FormData) {
  const assignmentId = Number(formData.get('assignmentId'))

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
      StaffOpinion: formData.get('staffOpinion') as string
    }
  })

  revalidatePath('/studentmentoring')
  redirect('/studentmentoring')
}

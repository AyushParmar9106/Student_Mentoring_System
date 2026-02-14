import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import EditMentorForm from './EditMentorForm'

export default async function EditMentorPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const assignmentId = Number(id)

  if (isNaN(assignmentId)) return notFound()

  // Fetch the data on the server
  const assignment = await prisma.studentmentor.findUnique({
    where: { StudentMentorID: assignmentId }
  })

  if (!assignment) return <div>Loading...</div>

  // FIX: Change 'mentorData={assignment}' to 'assignment={assignment}'
  // to match the prop name in your EditMentorForm component
  return <EditMentorForm assignment={assignment} />
}

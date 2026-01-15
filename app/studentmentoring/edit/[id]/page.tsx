import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import EditMentoringForm from './EditMentoringForm'

export default async function EditSessionPage ({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const sessionId = Number(id)

  if (isNaN(sessionId)) return notFound()

  const session = await prisma.studentmentoring.findUnique({
    where: { StudentMentoringID: sessionId },
    include: { studentmentor: { include: { students: true } } }
  })

  if (!session) return notFound()

  // Passing the 'assignment' prop to match the component definition
  return <EditMentoringForm assignment={session} />
}

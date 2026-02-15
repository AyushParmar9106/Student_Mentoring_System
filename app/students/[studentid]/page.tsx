<<<<<<< HEAD
import { notFound } from 'next/navigation'
import StudentHistoryView from './StudentHistoryView'
import { prisma } from '../../lib/prisma'
=======
import { prisma } from '@/app/lib/prisma'
import { notFound } from 'next/navigation'
import StudentHistoryView from './StudentHistoryView'
>>>>>>> d282a3810cbf7cbc9068d4230e349a3be90eecd7

export default async function DetailStudent ({
  params
}: {
  params: Promise<{ studentid: string }>
}) {
  const { studentid } = await params
  const id = Number(studentid)
  if (isNaN(id)) return notFound()

  const student = await prisma.students.findUnique({
    where: { StudentID: id },
    include: {
      studentmentor: {
        include: {
          staff: true,
          studentmentoring: { orderBy: { DateOfMentoring: 'desc' } }
        }
      }
    }
  })

  if (!student) return notFound()

  // FIX: We only need to pass the student object because it contains
  // the studentmentor data inside it.
  return <StudentHistoryView student={student} />
}

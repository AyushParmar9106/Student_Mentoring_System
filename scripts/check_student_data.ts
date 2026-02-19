
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const student = await prisma.students.findUnique({
        where: { StudentID: 2 },
        include: {
            studentmentor: {
                include: {
                    studentmentoring: { orderBy: { DateOfMentoring: 'desc' } }
                }
            }
        }
    })
    console.log(JSON.stringify(student, null, 2))
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

import { prisma } from "@/config"


async function findAllTicketsTypes() {
    return await prisma.ticketType.findMany()
}

async function findUserTicket(id: number) {
    const data = await prisma.ticket.findFirst({
        where: { id },
        select: {
            id: true,
            status: true,
            ticketTypeId: true,
            enrollmentId: true,
            TicketType: {
                select:{
                    id: true,
                    name: true,
                    price: true,
                    isRemote: true,
                    includesHotel: true,
                    createdAt: true,
                    updatedAt: true,
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    })
    return data
}


const ticketRepository = {
    findAllTicketsTypes,
    findUserTicket
}



export default ticketRepository
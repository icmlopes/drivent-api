import { prisma } from "@/config"
import { TicketStatus } from "@prisma/client"


async function findAllTicketsTypes() {
    return await prisma.ticketType.findMany()
}

async function findUserTicket(enrollmentId: number) {
    const data = await prisma.ticket.findFirst({
        where: {enrollmentId}
    })
    return data
}

async function createTicket(ticketTypeId: any, enrollmentId: number){
    
    const data = await prisma.ticket.create({
        data:{
            ticketTypeId: parseInt(ticketTypeId),
            enrollmentId,
            status: TicketStatus.RESERVED
        },
        include:{
            TicketType: true,
        }
    })
    return data
}


const ticketRepository = {
    findAllTicketsTypes,
    findUserTicket,
    createTicket,
}



export default ticketRepository
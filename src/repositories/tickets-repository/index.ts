import { prisma } from "@/config"
import { TicketStatus } from "@prisma/client"


async function findAllTicketsTypes() {
    return await prisma.ticketType.findMany()
}

async function findUserTicket(enrollmentId: number) {
    const data = await prisma.ticket.findFirst({
        where: {enrollmentId},
        include: {
            TicketType: true,
        }
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

async function getTicketByTicketId(ticketId: number){
    return prisma.ticket.findFirst({
        where: {id: ticketId},
            include:{
                Enrollment: true,
            }
    })
}

const ticketRepository = {
    findAllTicketsTypes,
    findUserTicket,
    createTicket,
    getTicketByTicketId
}



export default ticketRepository
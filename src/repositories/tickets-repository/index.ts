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

async function getTicketTypeByTicketId(ticketId: number){
    return prisma.ticket.findFirst({
        where: {
          id: ticketId,
        },
        include: {
          TicketType: true,
        }
      });
}

async function updateTicketStatus(ticketId: number){
    return await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        status: TicketStatus.PAID
      },
    });
  }

const ticketRepository = {
    findAllTicketsTypes,
    findUserTicket,
    createTicket,
    getTicketByTicketId,
    getTicketTypeByTicketId,
    updateTicketStatus
}



export default ticketRepository
import { prisma } from "@/config"
import { TicketStatus } from "@prisma/client"


async function findAllTicketsTypes() {
    return await prisma.ticketType.findMany()
}

async function findUserTicket(enrollmentId: number) {
    const data = await prisma.ticket.findFirst({
        where: {enrollmentId}
    })
    console.log("Tô aqui no repositorio", enrollmentId)
    return data
}

async function createTicket(ticketTypeId: number, enrollmentId: number){
    
    const data = await prisma.ticket.create({
        data:{
            ticketTypeId,
            enrollmentId,
            status: TicketStatus.RESERVED
        },
        include:{
            TicketType: true,
        }
    })
    console.log("Isso aqui ta no repositorio, verificando os dados", data)
    return data
}


const ticketRepository = {
    findAllTicketsTypes,
    findUserTicket,
    createTicket,
}



export default ticketRepository
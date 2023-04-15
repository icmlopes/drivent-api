import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";


async function getAllTickets(){
    return await ticketRepository.findAllTicketsTypes()
}

async function userTicket(id:number){
    const ticket = await ticketRepository.findUserTicket(id)
    if (!ticket){
        throw notFoundError
    }
    return ticket
}

const ticketService = {
    getAllTickets,
    userTicket
}

export default ticketService;
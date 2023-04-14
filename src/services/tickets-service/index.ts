import ticketRepository from "@/repositories/tickets-repository";


async function getAllTickets(){
    return await ticketRepository.findAllTicketsTypes()
}

const ticketService = {
    getAllTickets,
}

export default ticketService;
import { conflictError, notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";


async function getAllTickets(){
    return await ticketRepository.findAllTicketsTypes()
}

async function userTicket(userId:number){

    const findEnrollmentUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!findEnrollmentUserId){
        throw notFoundError()
    }

    const ticket = await ticketRepository.findUserTicket(findEnrollmentUserId.id)

    if (!ticket){
        throw notFoundError()
    }
    return ticket
}

async function postUserTicket(userId: number, ticketTypeId: number){

    const findEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    
    if (!findEnrollmentByUserId){
        throw notFoundError()
    }

    const isThereTicket = await ticketRepository.findUserTicket(findEnrollmentByUserId.id)

    if (isThereTicket !== null){

        throw conflictError("Ticket já existente!")
    }
     
    const data = await ticketRepository.createTicket(ticketTypeId, findEnrollmentByUserId.id)

    return data;

}


const ticketService = {
    getAllTickets,
    userTicket,
    postUserTicket
}

export default ticketService;
import { conflictError, notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/tickets-repository";


async function getAllTickets(){
    return await ticketRepository.findAllTicketsTypes()
}

async function userTicket(userId:number){

    console.log("tenho o userId aqui:", userId)

    const findEnrollmentUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    if (!findEnrollmentUserId){
        throw notFoundError()
    }

    const ticket = await ticketRepository.findUserTicket(findEnrollmentUserId.id)

    if (!ticket){
        console.log("Aqui no ticket repository  ")
        throw notFoundError()
    }
    return ticket
}

async function postUserTicket(userId: number, ticketTypeId: number){

    const findEnrollmentByUserId = await enrollmentRepository.findWithAddressByUserId(userId)
    
    if (!findEnrollmentByUserId){
        throw notFoundError()
    }

    await ticketRepository.createTicket(findEnrollmentByUserId.id, ticketTypeId)

    const data = await ticketRepository.findUserTicket(findEnrollmentByUserId.id)

    return data;

}


const ticketService = {
    getAllTickets,
    userTicket,
    postUserTicket
}

export default ticketService;
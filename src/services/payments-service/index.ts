import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";


async function checkPaymentParams(ticketId: number, userId: number){

    const ticket = await ticketRepository.getTicketByTicketId(ticketId)

    console.log(ticket)
    if(!ticket){
        throw notFoundError()
    }

    if(ticket.Enrollment.userId !== userId){
        throw unauthorizedError()
    }

    const data = await paymentRepository.getPaymentByTicketId(ticketId)

    if(!data){
        return notFoundError()
    }

    return data

}

const PaymentService = {
    checkPaymentParams,
}

export default PaymentService
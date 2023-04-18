import { notFoundError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";


async function checkPaymentParams(ticketId: number, userId: number){

    const ticket = await ticketRepository.getTicketByTicketId(ticketId)

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

async function postPayment(userId: number, ticketId: number, cardData: PaymentCard){

    const ticket = await ticketRepository.getTicketByTicketId(ticketId)

    if(!ticket){
        throw notFoundError()
    }

    if(ticket.Enrollment.userId !== userId){
        throw unauthorizedError()
    }
    
    const ticketType = await ticketRepository.getTicketTypeByTicketId(ticketId)

    if(!ticketType){
        throw notFoundError()
    }

    const userCardData = {
        ticketId: ticketId,
        value: ticketType.TicketType.price,
        cardIssuer: cardData.issuer,
        cardLastDigits: cardData.number.toString().slice(-4)
    }

    await ticketRepository.updateTicketStatus(ticketId)

    const userPayment = await paymentRepository.createPayment(userCardData)

    return userPayment;


}

export type PaymentCard = {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
}

export type UserPaymentData = {
    ticketId: number,
    value: number,
    cardIssuer: string,
    cardLastDigits: string
}

const PaymentService = {
    checkPaymentParams,
    postPayment
}

export default PaymentService
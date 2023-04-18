import { prisma } from "@/config";
import { UserPaymentData } from "@/services/payments-service";


async function getPaymentByTicketId(ticketId: number){
    return prisma.payment.findFirst({
        where: { ticketId }
    })
}


async function createPayment(userCardData: UserPaymentData){
    return prisma.payment.create({
        data: {
            ...userCardData,
        }
    })
}

const paymentRepository = {
    getPaymentByTicketId,
    createPayment
}

export default paymentRepository;
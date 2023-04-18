import { AuthenticatedRequest } from "@/middlewares";
import PaymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function createPayment(req: AuthenticatedRequest, res: Response){

    const { userId } = req

    const { ticketId, cardData } = req.body

    if(!ticketId || !cardData){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try{

        const payment = await PaymentService.postPayment(userId, ticketId, cardData)

        return res.status(httpStatus.OK).send(payment)

    } catch(e){
        
        if(e.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        return res.sendStatus(httpStatus.NOT_FOUND)
    }

}

export async function getPayment(req: AuthenticatedRequest, res: Response){

    const { userId } = req

    const ticketId = Number(req.query.ticketId)

    if(!ticketId){
        return res.status(httpStatus.BAD_REQUEST).send("Ticket não encontrado")
    }

    try{

        const findPayment = await PaymentService.checkPaymentParams(ticketId, userId)

        return res.status(httpStatus.OK).send(findPayment)

    } catch(e){

        if(e.name === "UnauthorizedError"){
            return res.sendStatus(httpStatus.UNAUTHORIZED)
        }

        return res.sendStatus(httpStatus.NOT_FOUND)
    }


}

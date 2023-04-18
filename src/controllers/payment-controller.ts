import { AuthenticatedRequest } from "@/middlewares";
import PaymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function createPayment(req: AuthenticatedRequest, res: Response){

}

export async function getPayment(req: AuthenticatedRequest, res: Response){

    const { userId } = req

    const ticketId = Number(req.query.ticketId)

    console.log("ticketId", ticketId)

    if(!ticketId){
        return res.status(httpStatus.BAD_REQUEST).send("Ticket não encontrado")
    }

    try{

        const findPayment = await PaymentService.checkPaymentParams(ticketId, userId)

        return res.status(httpStatus.OK).send(findPayment)

    } catch(e){
        console.log("Ta entrando aqui nessa merda")
        return res.sendStatus(httpStatus.NOT_FOUND)
    }


}

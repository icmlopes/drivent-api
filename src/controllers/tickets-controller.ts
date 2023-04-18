import { notFoundError } from "@/errors";
import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
import { error } from "console";
import { Request, Response } from "express";
import httpStatus from "http-status";


export async function getAllTicketsTypes(req: AuthenticatedRequest, res: Response){
    try{
        const tickets = await ticketService.getAllTickets()
        return res.status(httpStatus.OK).send(tickets);
    } catch(e){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function getUserTickets(req: AuthenticatedRequest, res: Response){

    const { userId } = req
    
    try{

        const ticket = await ticketService.userTicket(userId)

        return res.status(httpStatus.OK).send(ticket)

    } catch(e){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function createTicket(req: AuthenticatedRequest, res: Response){
    const {userId} = req

    const {ticketTypeId} = req.body
    
    if(!ticketTypeId){
        return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    try{

        const postTicket = await ticketService.postUserTicket(userId, ticketTypeId)

        return res.status(httpStatus.CREATED).send(postTicket)

    } catch(e){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }

}


   
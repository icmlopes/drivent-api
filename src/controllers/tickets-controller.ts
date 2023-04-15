import { AuthenticatedRequest } from "@/middlewares";
import ticketService from "@/services/tickets-service";
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

    const userId = parseInt(req.params.id)

    try{

        const ticket = await ticketService.userTicket(userId)

        return res.status(httpStatus.OK).send(ticket)

    } catch(e){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
}
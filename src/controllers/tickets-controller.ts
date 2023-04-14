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


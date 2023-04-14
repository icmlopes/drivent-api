import { prisma } from "@/config"


async function findAllTicketsTypes() {
    return await prisma.ticketType.findMany()
  }


const ticketRepository = {
    findAllTicketsTypes
  }



export default ticketRepository
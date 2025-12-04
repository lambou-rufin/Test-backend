import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {
  }

    /**
   * 
    * Endpoint pour créer un nouveau ticket.
   */
  @Post()
  async create(@Body() dto: CreateTicketDto) {
    console.log('[TicketController] POST /tickets body:', dto);
    try {
      const ticket = await this.ticketService.create(dto);
      console.log('[TicketController] Ticket créé:', ticket);
      return ticket;
    } catch (error) {
      console.error('[TicketController] Erreur création ticket:', error);
      throw error; // ou new InternalServerErrorException(error.message)
    }
  }

  /**
   * 
    * Endpoint pour touver tous les tickets.
  */
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  /**
   * 
    * Endpoint pour trouver un ticket par son ID.
   */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }



  /**
   * 
    * Endpoint pour mettre à jour le statut d'un ticket.
  */

  @Patch(':id')
  updateStatus(@Param('id') id: string) {
    return this.ticketService.updateStatus(+id);
  }
  /**
   * 
    * Endpoint pour supprimer un ticket par son ID.
   */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}

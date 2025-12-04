import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
   @Inject('TICKET_REPOSITORY')
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    console.log('[TicketService] Requête create reçue:', dto);

    const newTicket = this.ticketRepository.create({
      ...dto,
      status: dto.status ?? TicketStatus.OPEN, // valeur par défaut
      // ❌ createdAt non défini ici → généré par TypeORM automatiquement
    });

    console.log('[TicketService] Ticket créé avant save:', newTicket);

    const savedTicket = await this.ticketRepository.save(newTicket);

    console.log('[TicketService] Ticket sauvegardé:', savedTicket);
    return savedTicket;
  }

  async findAll(): Promise<Ticket[]> {
    console.log('[TicketService] findAll');
    return this.ticketRepository.find({
      order: { createdAt: 'DESC' }, // 🆕 tri par date (optionnel mais propre)
    });
  }

  async findOne(id: number): Promise<Ticket | null> {
    console.log('[TicketService] findOne id=', id);
    return this.ticketRepository.findOne({ where: { id } });
  }

  async updateStatus(id: number): Promise<Ticket | null> {
    console.log('[TicketService] Update status id=', id);

    const ticket = await this.ticketRepository.findOne({ where: { id } });

    if (!ticket) {
      console.log('[TicketService] Ticket non trouvé');
      return null;
    }

    if (ticket.status === TicketStatus.OPEN) {
      ticket.status = TicketStatus.IN_PROGRESS;
    } else if (ticket.status === TicketStatus.IN_PROGRESS) {
      ticket.status = TicketStatus.RESOLVED;
    }

    console.log('[TicketService] Ticket avant save:', ticket);

    const updated = await this.ticketRepository.save(ticket);

    console.log('[TicketService] Ticket après save:', updated);
    return updated;
  }

  async remove(id: number): Promise<boolean> {
    console.log('[TicketService] Suppression id=', id);

    const result = await this.ticketRepository.delete(id);

    console.log('[TicketService] Résultat suppression:', result);

    return result.affected > 0;
  }
}

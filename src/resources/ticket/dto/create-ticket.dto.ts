import { IsString, IsOptional, IsEnum, IsDate, IsEmpty } from 'class-validator';
import { TicketStatus } from '../entities/ticket.entity';

export class CreateTicketDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus = TicketStatus.OPEN;
}

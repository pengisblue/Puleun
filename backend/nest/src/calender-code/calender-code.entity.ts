import { Calender } from 'src/calender/calender.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class CalenderCode {
  @PrimaryColumn({ length: 1 })
  code: string;

  @Column({ length: 20, nullable: false })
  code_detail: string;
}

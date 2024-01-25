import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Pot } from '../pot/pot.entity';
import { CalenderCode } from '../calender-code/calender-code.entity';

@Entity()
export class Calender {
  @PrimaryGeneratedColumn()
  calender_id: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ length: 1, nullable: false })
  code: string;

  @ManyToOne(() => Pot, pot => pot.pot_id)
  @JoinColumn({name: 'pot_id'})
  pot: Pot;

  @OneToOne(() => CalenderCode)
  @JoinColumn({ name: 'code' })
  calenderCode: CalenderCode;

  // Other columns and relationships can be added as needed.
}

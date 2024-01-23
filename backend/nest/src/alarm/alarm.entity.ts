import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pot } from '../pot/pot.entity'

@Entity()
export class Alarm {
  @PrimaryGeneratedColumn()
  alarm_id: bigint;

  @Column({ length: 30, nullable: true })
  alarm_name: string;

  @Column({ length: 100, nullable: false })
  alarm_content: string;

  @Column({ type: 'tinyint', nullable: false })
  active_FG: number;

  @Column({ type: 'datetime', nullable: false })
  alarm_date: Date;

  @Column({ type: 'tinyint', nullable: false })
  routine: number;

  @ManyToOne(() => Pot)
  pot: Pot;

  // Other columns and relationships can be added as needed.
}

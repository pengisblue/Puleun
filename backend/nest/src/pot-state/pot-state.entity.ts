import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class PotState {
  @PrimaryGeneratedColumn({type: 'int'})
  pot_state_id: number;

  @Column({ type: 'double', nullable: false })
  temperature: number;

  @Column({ type: 'datetime', nullable: false })
  measure_DT: Date;

  @Column({ type: 'double', nullable: false })
  moisture: number;

  @ManyToOne(() => Pot)
  @JoinColumn({name: 'pot_id'})
  pot_id: Pot;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class PotState {
  @PrimaryGeneratedColumn()
  pot_state_id: bigint;

  @Column({ type: 'double', nullable: false })
  temperature: number;

  @Column({ type: 'datetime', nullable: false })
  measure_DT: Date;

  @Column({ type: 'double', nullable: false })
  moisture: number;

  @ManyToOne(() => Pot, pot => pot.potStates)
  pot: Pot;

  // Other columns and relationships can be added as needed.
}

import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  device_id:number;

  @Column({length:36, nullable: true })
  serial_number: string;

  // 0 이라면 비어있다.
  @Column({ type: 'tinyint', nullable: false, default: 0 })
  empty_FG: boolean;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({name:'user_id'})
  user: User;

  @Column({ nullable: true })
  user_id: number

  @OneToOne(() => Pot)
  @JoinColumn({ name: 'pot_id' })
  pot: Pot;

  @Column({type: 'int', nullable: true})
  pot_id: number;
  // Other columns and relationships can be added as needed.
}

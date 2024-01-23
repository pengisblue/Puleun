import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserLogin } from '../user-login/user-login.entity';
import { Pot } from '../pot/pot.entity';

@Entity()
export class Device {
 @PrimaryGeneratedColumn('uuid')
  device_id: string;

  @Column({ type: 'tinyint', nullable: false })
  empty_FG: number;

  @ManyToOne(() => UserLogin)
  user: UserLogin;

  @ManyToOne(() => Pot)
  pot: Pot;

  // Other columns and relationships can be added as needed.
}

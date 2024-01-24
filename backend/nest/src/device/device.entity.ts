import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserLogin } from '../user-login/user-login.entity';
import { Pot } from '../pot/pot.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  device_id:number;

  @Column({length:36, default: 'UUID()'})
  serial_number: string;

  @Column({ type: 'tinyint', nullable: false })
  empty_FG: boolean;

  @ManyToOne(() => UserLogin)
  @Column({type: 'int', name: 'user_id', nullable: false})
  user: UserLogin;

  @OneToOne(() => Pot)
  @Column({type: 'int', name: 'pot_id', nullable: false})
  pot: Pot;



  // Other columns and relationships can be added as needed.
}

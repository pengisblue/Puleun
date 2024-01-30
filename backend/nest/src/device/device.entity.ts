import { Entity, PrimaryColumn, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { UserLogin } from '../user-login/user-login.entity';
import { Pot } from '../pot/pot.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  device_id:number;

  @Column({length:36, default: 'UUID()'})
  serial_number: string;

  @Column({ type: 'tinyint', nullable: false })
  empty_FG: boolean;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({name:'user_id'})
  user: User;

  @Column({ nullable: false })
  user_id: number

  @OneToOne(() => Pot)
  @JoinColumn({ name: 'pot_id' })
  pot: Pot;

  @Column({type: 'int', nullable: false})
  pot_id: number;
  // Other columns and relationships can be added as needed.
}

import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class UserLogin {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ length: 10, nullable: false })
  user_name: string;

  @Column({ length: 30, nullable: false })
  user_email: string;

  @Column({ length: 30, nullable: false })
  user_password: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToOne(() => User, { nullable: true })
  parent: User;

  // Other columns and relationships can be added as needed.
}

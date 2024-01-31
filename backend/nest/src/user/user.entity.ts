import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(() => User, (user) => user.parent_id)
  user_id: number;

  @Column({ length: 10, nullable: false })
  nickname: string;

  @Column({ type: 'date', nullable: false })
  birth_DT: Date;

  @Column({ length: 1, nullable: false })
  gender: string;

  @Column({ length: 200, nullable: true })
  profile_img_url: string;

  @ManyToOne(() => User, (user) => user.user_id)
  @JoinColumn({name:'parent_id'})
  parent: User;

  @Column({ nullable: true })
  parent_id: number

  @OneToMany(() => Pot, (pot) => pot.user_id)
  Pots: Pot[];

  // Other columns and relationships can be added as needed.
}

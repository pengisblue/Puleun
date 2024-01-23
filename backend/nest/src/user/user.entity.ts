import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Pot } from '../pot/pot.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: bigint;

  @Column({ length: 10, nullable: false })
  nickname: string;

  @Column({ type: 'date', nullable: false })
  birth_DT: Date;

  @Column({ length: 1, nullable: false })
  gender: string;

  @Column({ length: 200, nullable: false })
  profile_img_url: string;

  @ManyToOne(() => User, { nullable: true })
  parent: User;

  @OneToMany(() => Pot, pot => pot.kid)
  pots: Pot[];

  // Other columns and relationships can be added as needed.
}

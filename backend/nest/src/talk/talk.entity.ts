import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Pot } from '../pot/pot.entity';
import { Sentence } from '../sentence/sentence.entity';

@Entity()
export class Talk {
  @PrimaryGeneratedColumn()
  talk_id: number;

  @Column({ length: 30, nullable: false })
  talk_title: string;

  @Column({ type: 'datetime', nullable: false })
  talk_DT: Date;

  @Column({ type: 'tinyint', nullable: false })
  read_FG: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Pot)
  pot: Pot;

  @OneToMany(() => Sentence, sentence => sentence.talk)
  sentences: Sentence[];

  // Other columns and relationships can be added as needed.
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => Pot)
  @JoinColumn({name: 'pot_id'})
  pot_id: Pot;
  // Other columns and relationships can be added as needed.
  
  @OneToMany(() => Sentence, sentence => sentence.sentence_id)
  sentence: Sentence[];

}

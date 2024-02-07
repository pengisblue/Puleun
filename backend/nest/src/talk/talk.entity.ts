import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
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

  @ManyToOne(() => Pot, (pot) => pot.talk )
  @JoinColumn({name: 'pot_id'})
  pot: Pot;
  
  @OneToMany(() => Sentence, sentence => sentence.sentence_id)
  sentence: Sentence[];

}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Pot } from '../pot/pot.entity';
import { Sentence } from 'src/sentence/sentence.entity';

@Entity()
export class Talk {
  @PrimaryGeneratedColumn()
  talk_id: number;

  @Column({ length: 30, nullable: false })
  talk_title: string;
  
  @Column({ type: 'datetime', nullable: false })
  talk_DT: Date;

  @Column({ type: 'tinyint', nullable: false })
  read_FG: boolean

  @ManyToOne(() => Pot, (pot) => pot.talk )
  @JoinColumn({name: 'pot_id'})
  pot: Pot;

  @Column({type: 'int'})
  pot_id: number;
  
  @OneToMany(() => Sentence, (sentence) => sentence.talk)
  @JoinColumn({name: 'sentence_id'})
  sentences: Sentence[];
}

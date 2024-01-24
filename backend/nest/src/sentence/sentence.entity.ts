import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Talk } from '../talk/talk.entity';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn({type: 'int'})
  sentence_id: number;

  @Column({ length: 100, nullable: false })
  content: string;

  @Column({ length: 100, nullable: false })
  audio: string;

  @Column({ type: 'datetime', nullable: false })
  sentence_DTN: Date;

  @Column({ type: 'tinyint', nullable: false })
  talker_FG: boolean;

  @ManyToOne(() => Talk)
  @JoinColumn({name: 'talk_id'})
  talk_id: Talk;

  // Other columns and relationships can be added as needed.
}

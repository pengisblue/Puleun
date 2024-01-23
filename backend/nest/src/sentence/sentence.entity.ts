import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Talk } from '../talk/talk.entity';

@Entity()
export class Sentence {
  @PrimaryGeneratedColumn()
  sentence_id: bigint;

  @Column({ length: 100, nullable: false })
  content: string;

  @Column({ length: 100, nullable: false })
  audio: string;

  @Column({ type: 'datetime', nullable: false })
  sentence_DTN: Date;

  @Column({ type: 'tinyint', nullable: false })
  talker_FG: number;

  @ManyToOne(() => Talk)
  talk: Talk;

  // Other columns and relationships can be added as needed.
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Pot } from '../pot/pot.entity'
import { Type } from 'class-transformer';

@Entity()
export class Alarm {
  @PrimaryGeneratedColumn()
  alarm_id: number;

  @Column({ length: 30, nullable: true })
  alarm_name: string;

  @Column({ length: 100, nullable: false })
  alarm_content: string;

  @Column({ type: 'tinyint', nullable: false })
  active_FG: boolean;

  // routine이 null이라면 해당 날짜에만 울리기
  // null이 아니라면 해당 요일에 시간에 반복적으로 울리기
  @Column({ type: 'timestamp', nullable: false})
  alarm_date: Date;

  // 비트 마스킹을 해야되는데 범위가 -127 ~ 127 ts가 부동소수점 계산이 잘될지 의문
  @Column({ type: 'tinyint', nullable: true })
  routine: number;

  @ManyToOne(() => Pot, pot => pot.pot_id, {cascade: ['update', 'remove']})
  @JoinColumn({name: "pot_id"})
  pot_id: number;


  // Other columns and relationships can be added as needed.
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity'; // 다른 엔터티에 따라 수정해야 합니다.
import { PotState } from '../pot-state/pot-state.entity';

@Entity()
export class Pot {
  @PrimaryGeneratedColumn({type: 'int'})
  pot_id: number;

  @Column({ length: 10, nullable: false })
  pot_name: string;

  @Column({ length: 10, nullable: false })
  pot_species: string;

  @Column({ type: 'double', nullable: true })
  min_temperature: number;

  @Column({ type: 'double', nullable: true })
  max_temperature: number;

  @Column({ type: 'double', nullable: true })
  min_moisture: number;

  @Column({ type: 'double', nullable: true })
  max_moisture: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 200, nullable: false })
  pot_img_url: string;

  @ManyToOne(() => User)
  @JoinColumn({name: 'user_id'}) // 외래키 식별자로 사용될 컬럼명
  user_id: User;

  @Column({ type: 'int', nullable: true})
  happy_cnt: number;

  @Column({ type: 'tinyint', nullable: false, default: 0})
  collection_FG: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity'; // 다른 엔터티에 따라 수정해야 합니다.
import { PotState } from '../pot-state/pot-state.entity';

@Entity()
export class Pot {
  @PrimaryGeneratedColumn()
  pot_id: bigint;

  @Column({ length: 10, nullable: false })
  pot_name: string;

  @Column({ length: 10, nullable: false })
  pot_species: string;

  @Column({ type: 'double', nullable: false })
  min_temperature: number;

  @Column({ type: 'double', nullable: false })
  max_temperature: number;

  @Column({ type: 'double', nullable: false })
  min_moisture: number;

  @Column({ type: 'double', nullable: false })
  max_moisture: number;

  @Column({ type: 'date', nullable: false })
  created_DT: Date;

  @Column({ type: 'date', nullable: false })
  end_DT: Date;

  @Column({ length: 200, nullable: false })
  pot_img_url: string;

  @ManyToOne(() => User, user => user.pots)
  @JoinColumn({ name: 'user_id'}) // 외래키 식별자로 사용될 컬럼명
  user: User;

  @ManyToOne(() => User, kid => kid.pots)
  @JoinColumn({ name: 'kid_id'}) // 외래키 식별자로 사용될 컬럼명
  kid: User;

  @OneToMany(() => PotState, potState => potState.pot)
  potStates: PotState[];

  @Column({ type: 'int', nullable: false})
  happy_cnt: number;

  @Column({ type: 'tinyint', nullable: false })
  collection_FG: number;


  static createPot(potName: string, potId: bigint, potSpecies: string): Pot {
    const pot = new Pot();
    pot.pot_name = potName;
    pot.pot_id = potId;
    pot.pot_species = potSpecies;
    // Set other properties as needed
    return pot;
  }
}

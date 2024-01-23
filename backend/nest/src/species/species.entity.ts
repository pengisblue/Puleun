import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  species_id: bigint;

  @Column({ length: 20, nullable: false })
  species_name: string;

  // Other columns...

  // Other columns and relationships can be added as needed.
}

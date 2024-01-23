import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class CalenderCode {
  @PrimaryColumn({ length: 1 })
  code: string;

  @Column({ length: 20, nullable: false })
  code_detail: string;

  // Other columns and relationships can be added as needed.
}

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Basket extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column('text')
  description: string;
  @Column({ type: 'float', precision: 6, scale: 2 })
  price: number;
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ default: 0 })
  boughtCounter: number;
  @Column({ default: false })
  wasEverBought: boolean;
}

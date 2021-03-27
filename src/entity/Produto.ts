import { ProdutoInterface } from './../interface/produto.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Index('pkey_produto', ['id'], { unique: true })
@Entity('produtos')
export class Produto implements ProdutoInterface {
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 256,
    nullable: false,
  })
  public description: string;
  @Column({
    name: 'price',
    type: 'decimal',
    nullable: false,
  })
  public price: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  readonly createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  readonly updatedAt: Date;
}

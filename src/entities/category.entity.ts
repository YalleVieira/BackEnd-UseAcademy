import { ProductEntity } from './product.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "categories" })
export class CategoryEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", nullable: false })
  name!: string;

  @CreateDateColumn({ name: 'created_at'})
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updated_at!: Date;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products?: ProductEntity[];
}
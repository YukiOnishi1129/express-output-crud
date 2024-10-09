import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

type TodoType = {
  readonly id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

@Entity('todos')
export class Todo implements TodoType {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column('varchar', { length: 50, nullable: false })
  public title!: string;

  @Column('text', { nullable: false })
  public content!: string;

  @CreateDateColumn({ name: 'created_at' })
  readonly createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  readonly updatedAt!: Date;
}

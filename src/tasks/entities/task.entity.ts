// task.entity.ts
import { User } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'Pendente' })
  status: 'Pendente' | 'Concluído';

  @Column({ default: 'Baixa' })
  priority: 'Alta' | 'Baixa' | 'Média';

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.tasks)
  user: User; 
}

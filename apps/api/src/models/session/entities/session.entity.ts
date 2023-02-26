import { User } from '@/models/user/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Session extends BaseEntity {
  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  id: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @Column({ type: 'text' })
  token: string;

  @Column({ type: 'int' })
  expires: number;
}

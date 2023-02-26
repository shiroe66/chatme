import { Session } from '@/models/session/entities/session.entity';
import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ default: () => 'gen_random_uuid()' })
  id: string;

  @Column({ type: 'text', unique: true, nullable: false })
  email: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column()
  username: string;

  // FIX: exclude password
  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];
}

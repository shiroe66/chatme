import { UserSession } from '@/common/interfaces';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ) {}

  async findOne(userId: string) {
    const session = await this.sessionRepository.find({
      where: { user: { id: userId } },
    });
    return session;
  }

  async verify(session: Session[], token: string) {
    const validTokens = session.filter(async (session) => {
      const isActiveSession = await argon2.verify(session.token, token);
      return isActiveSession;
    });
    // FIX: need check
    return validTokens[0];
  }

  async create(data: UserSession) {
    // FIX: check all sessions
    const { token } = data;
    const hashedToken = await argon2.hash(token);
    const session = this.sessionRepository.create({ ...data, token: hashedToken });
    await session.save();
    return session;
  }
}

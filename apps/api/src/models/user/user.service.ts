import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(phone: number) {
    const user = await this.userRepository.findOne({ where: { phone } });
    return user;
  }

  async create(data: { phone: number }) {
    const { phone } = data;
    const user = await this.findOne(phone);
    if (user) {
      throw new ConflictException();
    }

    const newUser = await this.userRepository.create(data).save();
    return newUser;
  }
}

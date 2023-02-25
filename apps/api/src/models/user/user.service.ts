import { RegisterDto } from '@/auth/dto/register.dto';
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async create(data: RegisterDto) {
    const { email } = data;
    const user = await this.findOne(email);
    if (user) {
      throw new ConflictException();
    }
    const newUser = await this.userRepository.create(data).save();
    return newUser;
  }

  async verifyEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user.isEmailConfirmed) {
      throw new BadRequestException();
    }
    return this.userRepository.save({ ...user, isEmailConfirmed: true });
  }
}

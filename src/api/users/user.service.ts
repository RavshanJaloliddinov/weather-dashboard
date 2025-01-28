import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../../core/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  // Create user
  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // Get all users
  async findAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  // Get user by ID
  async findOneUser(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  // Update user
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id } });
  }

  // Delete user
  async removeUser(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Username bo'yicha foydalanuvchini qidirish
  async findUserByUsername(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { username } });
  }
}

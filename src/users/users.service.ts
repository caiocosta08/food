import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './schema/users.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(createUserDto).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({}).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async findById(id: string): Promise<User> {
    return this.usersRepository.findOne(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }

  async updateUser(userUpdates: UpdateUserDto) {
    return this.usersRepository
      .Update(userUpdates._id, userUpdates)
      .catch((error) => {
        throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
      });
  }

  async deleteUser(id: string): Promise<User> {
    return this.usersRepository.Delete(id).catch((error) => {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    });
  }
}

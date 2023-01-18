import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UpdateUserDto, CreateUserDto } from './dto/user.dto';

import { User, UserDocument } from './schema/users.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<User> {
    return this.UserModel.findById(id).exec();
  }

  async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.UserModel.find(usersFilterQuery);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new this.UserModel(user);
    return newUser.save();
  }

  async Update(id: string, updateUserDto: UpdateUserDto) {
    const filter = { _id: id };
    return this.UserModel.findOneAndUpdate(filter, updateUserDto, {
      new: true,
    });
  }

  async Delete(id: string) {
    const deletar = this.UserModel.findByIdAndDelete({ _id: id }).exec();

    return (await deletar).remove();
  }
}

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './schema/users.schema';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<User>;
    getUsers(): Promise<any>;
    findById(id: string): Promise<User>;
    updateUser(updateUser: UpdateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}

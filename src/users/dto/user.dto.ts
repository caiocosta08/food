export class CreateUserDto {
  name: string;
  last_name: string;
  email: string;
  password: string;
}

export class UpdateUserDto {
  _id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
}

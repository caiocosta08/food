export class CreateCourseDto {
  title: string;
  description: string;
  time?: string;
  site_url?: string;
  price: number;
}

export class UpdateCourseDto {
  _id: string;
  title: string;
  description: string;
  time?: string;
  site_url?: string;
  price: number;
}

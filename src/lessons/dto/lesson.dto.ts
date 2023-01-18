export class CreateLessonDto {
  title: string;
  course_id: string;
  module_id: string;
  video_url: string;
}

export class UpdateLessonDto {
  _id: string;
  title: string;
  course_id: string;
  module_id: string;
  video_url: string;
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
import { DatabaseModule } from './database/database.module';
import { Log, LogSchema } from './app.schema';
import { PaymentsModule } from './payments/payments.module';
import { CoursesModule } from './courses/courses.module';
import { CourseModules_Module } from './course_modules/course_module.module';
import { LessonsModule } from './lessons/lessons.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { EventsModule } from './events/events.module';
import { ProductsModule } from './products/products.module';
dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
    MongooseModule.forRoot(process.env.MONGO_URL),
    PaymentsModule,
    CoursesModule,
    CourseModules_Module,
    LessonsModule,
    UsersModule,
    OrdersModule,
    EventsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}

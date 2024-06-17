import { Module } from '@nestjs/common';
import { AuthorModule } from './author/author.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { MemberModule } from './member/member.module';
import { LoanModule } from './loan/loan.module';
import { StaffModule } from './staff/staff.module';
import { PublisherModule } from './publisher/publisher.module';
import { BookPublisherModule } from './book-publisher/book-publisher.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthorModule,
    BookModule,
    CategoryModule,
    MemberModule,
    LoanModule,
    StaffModule,
    PublisherModule,
    BookPublisherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

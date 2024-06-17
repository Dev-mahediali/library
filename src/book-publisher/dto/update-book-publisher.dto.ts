import { PartialType } from '@nestjs/mapped-types';
import { CreateBookPublisherDto } from './create-book-publisher.dto';

export class UpdateBookPublisherDto extends PartialType(CreateBookPublisherDto) {}

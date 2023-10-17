import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetCurrentUser } from '../common/decorators';
import { BookService } from './book.service';
import { CreateBookDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getBooks(@GetCurrentUser('sub') userId: number) {
    return this.bookService.getAllBooks(userId);
  }

  @Get('/:id')
  getBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.getBook(id);
  }

  @Post('/create')
  createBook(dto: CreateBookDto) {
    return this.bookService.createBook(dto);
  }
}

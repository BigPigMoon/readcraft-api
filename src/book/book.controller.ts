import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUser } from '../common/decorators';
import { BookService } from './book.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { extname } from 'path';

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

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './books',
        filename(_, file, callback) {
          const filename = randomUUID();
          callback(null, `${filename}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  createBook(
    @GetCurrentUser('sub') userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 3000 * 1024 }),
          new FileTypeValidator({ fileType: 'epub' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.bookService.createBook({
      path: file.path,
      userId: userId,
    });
  }
}

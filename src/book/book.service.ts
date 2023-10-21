import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto';
import EPub from 'epub';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks(userId: number) {
    return this.prisma.book.findMany({ where: { ownerId: userId } });
  }

  async getBook(id: number) {
    return this.prisma.book.findUnique({ where: { id: id } });
  }

  async createBook(dto: CreateBookDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) throw new ForbiddenException('User not found');

    const book = new EPub(dto.path, '/imagewebroot/', '/articlewebroot/');

    book.on('error', (err) => {
      console.log('ERROR\n----');
      throw err;
    });

    // TODO: get the cover of the book
    book.on('end', async () => {
      await this.prisma.book.create({
        data: {
          title: book.metadata.title,
          owner: { connect: { id: dto.userId } },
          author: book.metadata.creator,
          language: book.metadata.language,
          subject: book.metadata.subject,
          publishDate: book.metadata.date,
          progress: 0,
          filePath: dto.path,
        },
      });
    });
    book.parse();
  }
}

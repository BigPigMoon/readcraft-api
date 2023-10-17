import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto';

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
    // return this.prisma.book.create({ data: {} });
  }
}

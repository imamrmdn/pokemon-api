import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user } from '@prisma/client';
import * as hash from '../shared/utils/hash.utils';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  //
  async createUser(body: CreateUserDto): Promise<ResponseCreateUserDto<user>> {
    //
    try {
      //
      const password = await hash.generateHashForPassword(body?.password);

      // create new user
      const data = await this.prisma.user.create({
        data: { ...body, password },
      });

      return {
        success: true,
        statusCode: HttpStatus.CREATED,
        message: 'Success signup/create new user',
        data,
      };
    } catch (error) {
      const message = this.prisma.exceptions(error);
      throw new BadRequestException(message);
    }
  }

  //
  async findOneByUsername(){
    //
    try {
      
    } catch (error) {
      const message = this.prisma.exceptions(error);
      throw new BadRequestException(message);
    }
  }
}

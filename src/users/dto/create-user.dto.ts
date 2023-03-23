import { JoiSchema } from 'nestjs-joi';
import { RoleUserEnum } from '@prisma/client';
import { ResponseDto } from 'src/shared/dto/global.dto';
import * as Joi from 'joi';

export class CreateUserDto {
  @JoiSchema(Joi.string().regex(/^\S+$/).min(6).max(20).required())
  username: string;

  @JoiSchema(Joi.string().min(6).max(100).required())
  password: string;

  @JoiSchema(
    Joi.string().valid(
      RoleUserEnum.Fighter,
      RoleUserEnum.Mage,
      RoleUserEnum.Marksman,
      RoleUserEnum.Support,
      RoleUserEnum.Tank,
    ),
  )
  role: RoleUserEnum;
}

export class ResponseCreateUserDto<TData> extends ResponseDto {
    data: TData
}

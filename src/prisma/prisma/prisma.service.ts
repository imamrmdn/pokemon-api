import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
// import { SoftDeleteOrUpdate } from './soft-delete.middleware';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     super();
//     this.$use(SoftDeleteOrUpdate);
//   }

  async onModuleInit() {
    await this.$connect();
  }
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  // LAST_UPDATED => 2023-03-23 13:48
  exceptions(e: any) {
    let error, msg;
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      error = 'KnownRequestError';
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      error = 'UnknownRequestError';
    } else if (e instanceof Prisma.PrismaClientRustPanicError) {
      error = 'RustPanicError';
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      error = 'InitializationError';
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      error = 'ValidationError';
    }
    switch (error) {
      case 'KnownRequestError':
        switch (e.code) {
          case 'P2002':
            msg = `Unique constraint failed on the constraint: ${e.meta['target']}`;
            break;
          case 'P2003':
            msg = `Foreign key constraint failed on the field: ${e.meta['field_name']}`;
            break;
          case 'P2011':
            msg = `Null constraint violation on the ${e.meta['constraint']}`;
            break;
          case 'P2022':
            msg = `The column ${e.meta['column']} does not exist in the current database.`;
            break;
          case 'P2025':
            msg = `An operation failed because it depends on one or more records that were required but not found. ${e.meta['cause']}`;
            break;
          case 'P2012':
            msg = `Missing a required value at ${e.path}`;
            break;
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'UnknownRequestError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'RustPanicError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'InitializationError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'ValidationError':
        msg = `${error} - ${e.message
          .replace(/\n/g, '')
          .split(')')
          .slice(-1)[0]
          .trim()}`;
        break;
      default:
        msg = `${e.code} - ${e.message}`;
        break;
    }
    return msg;
  }
}

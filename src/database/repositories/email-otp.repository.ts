import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema/schema';
import { emailOtps } from '../schema/schema';
import {
  DBQueryConfig,
  ExtractTablesWithRelations,
  KnownKeysOnly,
  SQL,
} from 'drizzle-orm';

type FindQueryParams = KnownKeysOnly<
  Omit<
    DBQueryConfig<'many', true, ExtractTablesWithRelations<typeof schema>>,
    'limit'
  >,
  Omit<
    DBQueryConfig<'many', true, ExtractTablesWithRelations<typeof schema>>,
    'limit'
  >
>;

@Injectable()
export class EmailOtpRepository {
  constructor(
    @Inject('DB_DEV') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(params: typeof emailOtps.$inferInsert) {
    return (await this.db.insert(emailOtps).values(params).returning())[0];
  }

  async findOne(params?: FindQueryParams) {
    const emailOtp = await this.db.query.emailOtps.findFirst(params);
    return emailOtp;
  }

  async findMany(params?: FindQueryParams) {
    const emailOtps = await this.db.query.emailOtps.findMany(params);
    return emailOtps;
  }

  async update(data: Partial<typeof emailOtps.$inferInsert>, filter?: SQL) {
    return (
      await this.db.update(emailOtps).set(data).where(filter).returning()
    )[0];
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema/schema';
import { users } from '../schema/schema';
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
export class UserRepository {
  constructor(
    @Inject('DB_DEV') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(params: typeof users.$inferInsert) {
    return (await this.db.insert(users).values(params).returning())[0];
  }

  async findOne(params?: FindQueryParams) {
    const user = await this.db.query.users.findFirst(params);
    return user;
  }

  async findMany(params?: FindQueryParams) {
    const users = await this.db.query.users.findMany(params);
    return users;
  }

  async update(data: Partial<typeof users.$inferInsert>, filter?: SQL) {
    return (await this.db.update(users).set(data).where(filter).returning())[0];
  }

  async softDelete(params?: SQL) {
    return this.db.update(users).set({ deletedAt: new Date() }).where(params);
  }
}

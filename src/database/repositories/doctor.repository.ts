import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../schema/schema';
import { doctors } from '../schema/schema';

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
export class DoctorRepository {
  constructor(
    @Inject('DB_DEV') private db: PostgresJsDatabase<typeof schema>,
  ) {}

  async create(doctor: typeof doctors.$inferInsert) {
    return await this.db.insert(doctors).values(doctor).returning();
  }

  async findOne(params?: FindQueryParams) {
    const doctor = await this.db.query.doctors.findFirst(params);
    return doctor;
  }

  async findMany(params?: FindQueryParams) {
    const doctors = await this.db.query.doctors.findMany(params);
    return doctors;
  }

  async softDelete(params?: SQL) {
    await this.db.update(doctors).set({ deletedAt: new Date() }).where(params);
  }
}

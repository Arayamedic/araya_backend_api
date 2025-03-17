import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

// Define User Table
export const users = pgTable('users', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name').notNull(),
  middleName: varchar('middle_name'),
  avatarUrl: varchar('avatar_url'),
  nickName: varchar('nick_name').unique(),
  role: varchar('role').notNull(),
  email: varchar('email').notNull().unique(),
  emailIsVerified: boolean('email_is_verified').default(false).notNull(),
  password: varchar('password').notNull(),
  gender: varchar('gender'),
  dob: timestamp('dob', { mode: 'date' }),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  phoneNumberIsVerified: boolean('phone_number_is_verified')
    .default(false)
    .notNull(),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

// Define Doctor Table
export const doctors = pgTable('doctors', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id),
  medicalLicenseUrl: varchar('medical_license_url').notNull(),
  governmentIssuedIdUrl: varchar('government_issued_id_url').notNull(),
  specialization: varchar('specialization').notNull(),
  yearsOfExperience: integer('years_of_experience').notNull(),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const usersRelations = relations(users, ({ one }) => ({
  doctor: one(doctors),
}));

export const doctorRelations = relations(doctors, ({ one }) => ({
  user: one(users, { fields: [doctors.userId], references: [users.id] }),
}));

// Define Email OTP Table
export const emailOtps = pgTable('email_otps', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  email: varchar('email').notNull(),
  otp: varchar('otp').notNull(),
  otpType: varchar('otp_type').notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at')
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp('updated_at')
    .default(sql`now()`)
    .notNull(),
});

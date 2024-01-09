/**
 * [PATH] src/utils/helpers.ts
 * This file contains the helper functions
 */
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export function generateUID(): string {
  return uuidv4();
}

export function isMongoId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
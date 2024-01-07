/**
 * [PATH] src/utils/helpers.ts
 * This file contains the helper functions
 */

import { v4 as uuidv4 } from 'uuid';

export function generateUID(): string {
  return uuidv4();
}

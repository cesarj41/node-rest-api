import { Service } from 'typedi';
import { PrismaClient } from '@prisma/client';

@Service()
export class DbContext {
  public db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }
}
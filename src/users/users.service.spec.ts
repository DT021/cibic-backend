import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';

import { UsersSchema } from './users.schema';
import { CabildoSchema } from '../cabildos/cabildo.schema';

import * as mongoose from 'mongoose';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    let userModel = mongoose.model('Users', UsersSchema);
    let cabildoModel = mongoose.model('Cabildo', CabildoSchema);
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: userModel,
        },
        {
          provide: getModelToken('Cabildo'),
          useValue: cabildoModel,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(userService).toBeDefined();
    });
  });
});
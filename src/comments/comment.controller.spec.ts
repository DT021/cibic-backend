import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
const  { setupDB } = require('../../test/setupdb');
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentSchema, Comment } from './comment.schema';
import mongoose = require('mongoose');
import { NotFoundException } from '@nestjs/common';

import { ActivityService } from '../activities/activity.service';
import { ActivitySchema, Activity } from '../activities/activity.schema';
import { ActivityModule } from '../activities/activity.module';

import { CabildoSchema, Cabildo } from '../cabildos/cabildo.schema';
import { CabildoModule } from '../cabildos/cabildo.module';

import { UsersSchema, Users } from '../users/users.schema';
import { UsersModule } from '../users/users.module';

describe('CommentController', () => {
  setupDB('cibic', true);
  let controller: CommentController;
  let mockComment: Comment = {
    idUser: mongoose.Types.ObjectId("123456789012345678901234"),
	  publishDate: Date.now(),
	  content: "I made my first activity!",
	  score: 42,
	  reply: [],
  };

  beforeEach(async () => {
    let commentModel = mongoose.model('Comment', CommentSchema);
    let activityModel = mongoose.model('Activity', ActivitySchema);
    let usersModel = mongoose.model('Users', UsersSchema);
    let cabildoModel = mongoose.model('Cabildo', CabildoSchema);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        ActivityService,
        CommentService,
        {
          provide: getModelToken('Comment'),
          useValue: commentModel,
        },
        {
          provide: getModelToken('Activity'),
          useValue: activityModel,
        },
        {
          provide: getModelToken('Users'),
          useValue: usersModel,
        },
        {
          provide: getModelToken('Cabildo'),
          useValue: cabildoModel,
        }

      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  describe('root', () => {
    let genId;
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
    it('should get empty set', () => {
      return controller.getAllComments().then(data => expect(data).toStrictEqual([]));
    });
    it('shouldn`t find an invalid idComment', () => {
      return controller.getCommentById("4c6d7a6a5").catch(err => expect(err).toBeInstanceOf(NotFoundException));
    })
    it('shouldn`t find a nonexistant comment', () => {
      return controller.getCommentById("4c6d7a6a5d65aa7acdb65bef").catch(err => expect(err).toBeInstanceOf(NotFoundException));
    })
    it('should create a comment, then find that comment', () => {
      controller.addComment(mockComment, "123456789009876543218475").then(data => {
        expect(data.id).toHaveLength(24)
        return controller.getCommentById(data.id)
          .then(data => expect(data).toMatchObject(mockComment))
          .catch(err => expect(1).toBe(2));
      });
    });
  });
});

import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

const argon2 = require('argon2');
const DB = require('../config/db');

const getUser = async (ctx: Context) => {
  const { username, password } = ctx.request.body;
  const data = await DB.find('user', { username });

  let feedback;
  try {
    feedback = {
      code: 200,
      msg: 'success',
      data: {},
    };
    if (data && data.length > 0) {
      const user = data[0];
      if (await argon2.verify(user.password, password)) {
        feedback.data = { id: user._id, token: jwt.sign({ id: user._id }, JWT_SECRET) };
      } else {
        feedback.code = 500;
        feedback.msg = '密码错误';
        feedback.data = { id: user._id };
      }
    }
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const addUser = async (ctx: Context) => {
  // ctx.body = `addArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  const { username, password } = ctx.request.body;
  const data = await DB.insert('user', {
    username,
    password: await argon2.hash(password),
    createTime: Date.now(),
  });
  let feedback;
  try {
    feedback = {
      code: 200,
      msg: `add success ${data.insertedId}`,
      data: { id: data.insertedId, token: jwt.sign({ id: data.insertedId }, JWT_SECRET) },
    };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
export default {
  getUser,
  addUser,
};

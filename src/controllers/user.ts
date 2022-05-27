import { Context } from 'koa';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

const argon2 = require('argon2');
const DB = require('../config/db');

const loginUser = async (ctx: Context) => {
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
        feedback.data = { id: user._id, token: jwt.sign({ id: user._id }, JWT_SECRET), user };
      } else {
        feedback.code = 500;
        feedback.msg = '密码错误';
        feedback.data = {};
      }
    }
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
const registerUser = async (ctx: Context) => {
  // ctx.body = `addArticle controller with article = ${JSON.stringify(ctx.request.body)}`;
  const { username, password, email } = ctx.request.body;
  const existUser = await DB.find('user', { username });
  let feedback: any = {};
  if (existUser && existUser.length > 0) {
    feedback = {
      code: 500,
      msg: '用户名已存在',
      data: {},
    };
  } else {
    const data = await DB.insert('user', {
      username,
      password: await argon2.hash(password),
      email,
      createTime: Date.now(),
    });

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
  }
  ctx.body = feedback;
};
// 查询用户
const listUser = async (ctx: Context) => {
  const { current = 1, pageSize = 10, keywords, order } = ctx.request.query;
  let matchOption: any = {};
  if (keywords) {
    matchOption.username = { $regex: keywords };
  }
  if (order) {
  }
  const data = await DB.find('user', matchOption, {}, { page: current, pageSize });
  const total = await DB.findCount('user', matchOption, {});
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data, total };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
// 管理文章
const getUser = async (ctx: Context) => {
  const { id } = ctx.params;
  const data = await DB.find('user', { _id: DB.getObjectID(id) });

  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data: data[0] };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
// 管理文章
const updateUser = async (ctx: Context) => {
  const { _id, username, password, ...rest } = ctx.request.body;
  const res = await DB.update('user', { _id: DB.getObjectID(_id) }, { ...rest });
  let feedback;
  if (res.matchedCount > 0) {
    feedback = { code: 200, msg: 'edit success' };
  } else {
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
export default {
  loginUser,
  registerUser,
  listUser,
  getUser,
  updateUser,
};

import { Context } from 'koa';
const DB = require('../config/db');
// 查询文章
const listTags = async (ctx: Context) => {
  const { current = 1, pageSize = 10, keywords, order } = ctx.request.query;
  let matchOption: any = {};
  if (keywords) {
    matchOption.label = { $regex: keywords };
  }
  if (order) {
  }
  const data = await DB.find('tags', matchOption, {}, { page: current, pageSize });
  const total = await DB.findCount('tags', matchOption, {});
  let feedback;
  try {
    feedback = { code: 200, msg: 'success', data, total };
  } catch (e) {
    console.log(e);
    feedback = { code: 500, msg: 'server error' };
  }
  ctx.body = feedback;
};
export default {
  listTags,
};

import { Context } from 'koa';
const config = require('../config/index');
// 文件上传
const fileUpload = (ctx: Context) => {
  const file: any = ctx.request.files?.file;
  const [_, url] = file.filepath.split('static');
  const { host, port } = config;
  let feedback;
  if (file) {
    feedback = { code: 200, msg: '上传成功', data: { url: `${host}:${port}${url}` } };
  } else {
    feedback = { code: 500, msg: '上传失败' };
  }
  ctx.body = feedback;
};
export default {
  fileUpload,
};

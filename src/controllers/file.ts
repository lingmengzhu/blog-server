import { Context } from 'koa';
import moment from 'moment';
const { getRandomString } = require('../utils');
const path = require('path');
const fs = require('fs');
const ftpServer = require('../module/ftp');
// 文件服务器地址
const serverUrl = 'http://42.192.57.35:8048/blog';

// 文件上传
const fileUpload = async (ctx: Context) => {
  const drName = moment().format('YYYYMMDD');
  const randomName = getRandomString(16);
  const file: any = ctx.request.files?.file;
  const suffix = '.' + file.originalFilename.split('.').pop();
  const fileName = randomName + suffix;
  let feedback;
  let { err: eb } = await ftpServer.put(file.filepath, `/blog/${drName}/${fileName}`);
  if (eb) {
    console.log(eb);
    feedback = { code: 500, msg: '上传失败' };
  } else {
    feedback = { code: 200, msg: '上传成功', data: { url: `${serverUrl}/${drName}/${fileName}` } };
  }
  // 文件写入本地
  // const reader = fs.createReadStream(file.filepath);
  // let filePath = path.join(__dirname, '../static/upload/') + `/${file.originalFilename}`;
  // const upStream = fs.createWriteStream(filePath);
  // reader.pipe(upStream);
  ctx.body = feedback;
};
export default {
  fileUpload,
};

const ftp = require('ftp'); //连接FTP
const path = require('path');
const client = new ftp();
const fs = require('fs');

client.on('ready', () => {
    console.log('ftp client is ready');
});
client.on('close', () => {
    console.log('ftp client has close')
});
client.on('end', () => {
    console.log('ftp client has end')
});
client.on('error', (err) => {
    console.log('ftp client has an error : ' + JSON.stringify(err))
});
client.connect({
    host: '42.192.57.35',
    port: '21',
    keepalive: 1000
});
//列出目标目录
async function list(dirpath) {
    let {
        err: ea,
        dir
    } = await cwd(dirpath);
    return new Promise((resolve, reject) => {
        client.list((err, files) => {
            resolve({
                err: err,
                files: files
            })
        })
    });
}
//创建目录
async function mkdir(dirpath) {
    let {
        err: ea,
        dir
    } = await cwd('/');
    return new Promise((resolve, reject) => {
        client.mkdir(dirpath, (err, files) => {
            resolve({
                err: err,
                files: files
            })
        })
    });
}
//切换目录
function cwd(dirpath) {
    return new Promise((resolve, reject) => {
        client.cwd(dirpath, (err, dir) => {
            resolve({
                err: err,
                dir: dir
            });
        })
    });
}
//下载文件
async function get(filePath) {
    const dirpath = path.dirname(filePath);
    const fileName = path.basename(filePath);
    let {
        err: ea,
        dir
    } = await cwd(dirpath);
    return new Promise((resolve, reject) => {
        client.get(fileName, (err, rs) => {
            let ws = fs.createWriteStream(fileName);
            rs.pipe(ws);
            resolve({
                err: err
            });
        });
    });
}
//将文件上传到ftp目标地址
async function put(currentFile, targetFilePath) {
    // 优先创建日期目录
    const dirpath = path.dirname(targetFilePath);
    console.log("dirpath", dirpath)
    let {
        err: drErr
    } = await mkdir(dirpath);
    const fileName = path.basename(targetFilePath);
    const rs = fs.createReadStream(currentFile);
    let {
        err: ea,
        dir
    } = await cwd(dirpath); //此处应对err做处理
    if (ea) {
        return Promise.resolve({
            err: ea
        });
    }
    return new Promise((resolve, reject) => {
        client.put(rs, fileName, (err) => {
            resolve({
                err: err
            });
        })
    });
}
// async function test (){
//     //list 列表功能
//     let {err,files} = await list('/attachment/byycampus/resource');
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(`获得文件列表:`+files.length);
//     console.log(files);

//     //下载文件
//     let {err : ea} = await get('/attachment/byycampus/resource/201812/14/201812141035222541381967.jpg');
//     if(ea){
//         console.log(ea);
//         return;
//     }
//     console.log('文件下载成功')

//     //文件上传
//     let {err : eb} = await put('201812141035222541381967.jpg','/attachment/a.jpg');
//     if(eb){
//         console.log(eb);
//         return;
//     }
//     console.log('文件上传成功')
// }
// test();
module.exports = {
    list,
    get,
    put
}
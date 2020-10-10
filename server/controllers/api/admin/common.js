const fs = require('fs');

// 图片上传
exports.upload = () => {
    return async (ctx) => {
        const { body, files } = ctx.request
        const { directoryName } = body;
        const { size, type, path, name } = files.file
        // 限制图片大小2m,大于2m需要前端coanvs压缩
        const isLt2M = size / 1024 / 1024 < 2;
        const imgtype = ['image/gif', 'image/jpg', 'image/jpeg', 'image/png'];
        const isImg = imgtype.includes(type);
        if (!isLt2M) {
            ctx.body = resultInfo(ctx, {
                status: 500,
                message: '文件超过大小限制'
            });
            return false;
        }
        if (!isImg) {
            ctx.body = resultInfo(ctx, {
                status: 500,
                message: '上传头像图片只能是 gif/jpg/jpeg/png 格式!'
            });
            return false;
        }
        // 创建可读流
        const reader = fs.createReadStream(path);
        // 获取上传文件扩展名
        const suffixName = name.split('.').pop();
        // 获取原图片名称
        const imgName = name.split('.')[0];
        // 创建文件夹
        const static = 'static/';
        const filePath = `public/${directoryName}/${nowFormatDate()}/`;
        const mkdirPaht = static + filePath;
        mkdirsSync(mkdirPaht);
        const imgPath = `${filePath}${imgName}_${new Date().getTime()}.${suffixName}`;
        const createPath = static + imgPath;
        // 创建可写流
        const upStream = fs.createWriteStream(createPath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        // 组装数据模型
        const imgSchema = {};
        const schemaData = [imgName, imgPath, suffixName, directoryName, nowFormatDate(), new Date().getTime()];
        Object.keys(imagesInterface).forEach((name, key) => {
            imgSchema[name] = schemaData[key];
        });
        ctx.body = resultInfo(ctx, {
            data: await new images(imgSchema).save()
        });
    }
}

// 获取图片列表
exports.queryImages = () => {
    return async (ctx) => {
        const { pageMax, pageNo, directory } = ctx.request.query;
        const no = Number(pageNo) || 1;
        const max = Number(pageMax) || 15;
        const skip = (no - 1) * max;
        const param = directory ? { directoryName: directory } : {};
        ctx.body = resultInfo(ctx, {
            data: {
                list: await images.find(param).limit(max).skip(skip),
                page: {
                    pageMax: max,
                    pageNo: no,
                    total: await images.countDocuments(param)
                }
            }
        });
    }
}

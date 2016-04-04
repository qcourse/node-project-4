'use strict';

const qcloud = require("qcloud_cos");
const conf = qcloud.conf;
const cos = qcloud.cos;

const appId = "10028115";
const secretId = "AKID3vtUR9S5SUFuM0uNW9T9gIpX3gDcZ4fA";
const secretKey = "hH9mBkzjWDwSGcDfzLJPTScCJ7uIWaTl";

conf.setAppInfo(appId, secretId, secretKey);

function promisify(fn, args, callback, context) {
    return new Promise((resolve, reject) => {
        fn.apply(context, args.concat((result) => {
            if (callback) {
                callback(result);
            }
            if (result.code) {
                reject(result);
            } else {
                resolve(result);
            }
        }));
    });
}

/**
 * @method upload()
 * 
 * 上传文件到 COS 服务
 * 
 * @param {string} filePath     要上传到 COS 的本地文件路径
 * @param {string} bucketName   指定上传到 COS 的目标 bucket
 * @param {string} destPath     指定上传到 Bucket 下的指定路径
 * @param {string} bizAttr      文件的额外信息
 * @param {Function(result)} callback  上传完成的回掉
 */
exports.upload = function(filePath, bucketName, dstPath, bizAttr, callback) {
    return promisify(cos.upload, [filePath, bucketName, dstPath, bizAttr], callback, cos);
};

/**
 * @method delete
 * 
 * 删除 COS 中的文件
 * 
 * @param {string} bucketName 要删除的文件所在的 bucket
 * @param {string} path       要删除的文件所在的路径
 * @param {Function} callback 上传完成后的回掉
 */
exports.delete = function(bucketName, path, callback) {
    return promisify(cos.deleteFile, [bucketName, path], callback, cos);
}
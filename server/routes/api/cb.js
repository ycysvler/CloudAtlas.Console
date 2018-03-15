let multiparty = require('multiparty');
let moment = require('moment');
let Redis = require('ioredis');
let uuid = require('uuid');
let path = require('path');
let fs = require('fs');
let rediscfg = require('../../config/redis');

let getMongoPool = require('../../mongo/pool');

let pub = new Redis(rediscfg);

module.exports = function (router) {

    // PaaS -> 图片上传
    router.post('/cbmessage', (req, res, next) => {
        console.log(req.body);
        res.send({code:200});
    });
}
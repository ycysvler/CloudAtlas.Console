/*
 * 从 mysql 向 mongodb 导数据
 * */

const pool = require('../server/mysql/pool');
const getMongoPool = require('../server/mongo/pool');

async function list(index){
    return new Promise((resolve, reject) => {
        var sql =  'SELECT * from d_ap_0901 limit ?, 100';
        let skip = (index - 1) * 100;
        pool.query(sql,[skip],function(error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

async function createPatent(item){
    let Patent = getMongoPool('ent_20170808220894').Patent;

    let patent = new Patent();
    patent['ap_num'] = item['ap_num'];
    patent['image_ok'] = item['image_ok'];
    patent['ap_name'] = item['ap_name'];
    patent['ap_date'] = item['ap_date'];
    patent['db_type'] = item['db_type'];
    patent['main_class'] = item['main_class'];
    patent['sub_class'] = item['sub_class'];
    patent['simple_name'] = item['simple_name'];
    patent['pub_date'] = item['pub_date'];
    patent['pub_num'] = item['pub_num'];
    patent['pa_name'] = item['pa_name'];
    patent['designer'] = item['designer'];
    patent['agent_name'] = item['agent_name'];
    patent['prio_date'] = item['prio_date'];
    patent['abstract'] = item['abstract'];

    //console.log(patent.ap_num);

    return new Promise((resolve, reject) => {
        patent.save((err, item)=>{
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(item);
            }
        });
    });
}



async function run() {
    let count = 1;
    let page = 0;
    while (count > 0) {
        page = page + 1;
        let items = await list(page);
        count = items.length;

        console.log(page, count, '-----------------------');

        for (let key in items) {
            let item = items[key];
            await createPatent(item);
        }
    }
}

run();

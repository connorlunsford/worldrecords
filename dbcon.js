var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_pursifur',
  password        : '8618',
  database        : 'cs340_pursifur'
});

module.exports.pool = pool;

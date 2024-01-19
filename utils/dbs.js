'use strict'
const mysql = require('mysql2/promise')
const config = require('./config')
const pool = mysql.createPool(config.poolConfig)
function keepAlive() {
    pool.getConnection().then((connection) => {
        connection.ping()
        connection.release()
    }).catch(err => {
        if (err) { console.error(`[ERROR] [${new Date()}] mysql keepAlive err`, err); return; }
    })
}
setInterval(keepAlive, 5000)
module.exports = pool
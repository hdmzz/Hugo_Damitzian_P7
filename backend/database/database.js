const mysql = require('mysql');

exports.databaseConnect = () => {
    const db = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: 'password',
        database: "groupomania",
        port: 8889
        });
        return db
}